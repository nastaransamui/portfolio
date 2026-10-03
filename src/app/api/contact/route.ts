import { readFile } from "fs/promises";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const serverEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const getClientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  || request.headers.get("x-real-ip")
  || "unknown";

const checkRateLimit = (ip: string) => {
  const now = Date.now();

  for (const [key, value] of requestCounts) {
    if (value.resetAt <= now) requestCounts.delete(key);
  }

  const current = requestCounts.get(ip);
  if (!current) {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { limited: false, retryAfter: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      limited: true,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { limited: false, retryAfter: 0 };
};

export async function POST(request: Request) {
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json(
        { success: false, message: "Content-Type must be application/json." },
        { status: 415 },
      );
    }

    const rateLimit = checkRateLimit(getClientIp(request));
    if (rateLimit.limited) {
      return NextResponse.json(
        { success: false, message: "Too many messages. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfter) },
        },
      );
    }

    const body = await request.json() as ContactRequest;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const website = typeof body.website === "string" ? body.website.trim() : "";

    if (website) {
      return NextResponse.json({ success: true, message: "Thanks, your message has been sent." });
    }

    if (name.length < 2 || name.length > 80 || /[\r\n]/.test(name)) {
      return NextResponse.json(
        { success: false, message: "Name must be between 2 and 80 characters." },
        { status: 400 },
      );
    }

    if (email.length > 254 || !serverEmailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Enter a valid email address." },
        { status: 400 },
      );
    }

    if (message.length < 10 || message.length > 3000) {
      return NextResponse.json(
        { success: false, message: "Message must be between 10 and 3000 characters." },
        { status: 400 },
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      throw new Error("SMTP configuration is incomplete.");
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      auth: { user: smtpUser, pass: smtpPass },
      secure: true,
    });
    const htmlTemplate = await readFile(
      `${process.cwd()}/public/email.html`,
      "utf-8",
    );
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br />");

    const confirmationHtml = htmlTemplate
      .replaceAll("{{name}}", safeName)
      .replaceAll("{{message}}", safeMessage)
      .replaceAll("{{email}}", safeEmail);

    await Promise.all([
      transporter.sendMail({
        from: smtpUser,
        to: smtpUser,
        replyTo: email,
        subject: `Portfolio message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<h1>New portfolio message</h1><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Message:</strong><br />${safeMessage}</p>`,
      }),
      transporter.sendMail({
        from: smtpUser,
        to: email,
        replyTo: smtpUser,
        subject: "Thanks for reaching out",
        text: `Hi ${name},\n\nThanks for contacting me through my portfolio. I received your message and will reply as soon as possible.\n\nYour message:\n${message}`,
        html: confirmationHtml,
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Thanks, your message has been sent.",
    });
  } catch (error) {
    console.error("Contact form delivery failed:", error);
    return NextResponse.json(
      { success: false, message: "Unable to send your message right now." },
      { status: 500 },
    );
  }
}
