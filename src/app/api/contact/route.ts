import fs from "fs";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, message, name } = await req.json();
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_EMAIL_USER,
        pass: process.env.SMTP_PASS,
      },
      secure: true,
    });

    const htmlEmail = fs.readFileSync(
      `${process.cwd()}/public/email.html`,
      "utf-8",
    );

    const info = await transporter.sendMail({
      from: process.env.SMTP_EMAIL_USER,
      to: `${email}, ${process.env.SMTP_EMAIL_USER}`,
      subject: "Thanks for reaching out",
      html: htmlEmail
        .replaceAll("{{name}}", name)
        .replaceAll("{{message}}", message)
        .replaceAll("{{email}}", email),
    });

    return NextResponse.json({
      success: true,
      message: `Email was send to: ${info.accepted[0]}`,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: String(error) },
      { status: 500 },
    );
  }
}
