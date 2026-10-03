import { timingSafeEqual } from 'node:crypto';
import { resolve4 } from 'node:dns/promises';
import https from 'node:https';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const HOME_IP_DOMAIN = 'health-care.duckdns.org';
const PORTFOLIO_DOMAIN = 'mj-portfolio.duckdns.org';
const DUCKDNS_DOMAIN = 'mj-portfolio';
const VERCEL_IP = '216.198.79.1';

const isAuthorized = (request: Request, secret: string) => {
  const received = request.headers.get('authorization') || '';
  const expected = `Bearer ${secret}`;

  if (received.length !== expected.length) return false;

  return timingSafeEqual(Buffer.from(received), Buffer.from(expected));
};

const checkHomePortfolio = (homeIp: string) => new Promise<boolean>((resolve) => {
  const request = https.request({
    hostname: homeIp,
    port: 443,
    path: '/',
    method: 'HEAD',
    servername: PORTFOLIO_DOMAIN,
    headers: { Host: PORTFOLIO_DOMAIN },
    rejectUnauthorized: true,
    timeout: 5000,
  }, (response) => {
    response.resume();
    resolve(Boolean(response.statusCode && response.statusCode < 500));
  });

  request.on('timeout', () => {
    request.destroy();
    resolve(false);
  });
  request.on('error', () => resolve(false));
  request.end();
});

export async function GET(request: Request) {
  const duckDnsToken = process.env.DUCKDNS_TOKEN;
  const failoverSecret = process.env.FAILOVER_SECRET;

  if (!duckDnsToken || !failoverSecret) {
    console.error('Failover environment variables are not configured.');
    return NextResponse.json({ success: false }, { status: 500 });
  }

  if (!isAuthorized(request, failoverSecret)) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  let homeIp = '';
  let homeIsHealthy = false;

  try {
    [homeIp] = await resolve4(HOME_IP_DOMAIN);
    homeIsHealthy = await checkHomePortfolio(homeIp);
  } catch (error) {
    console.error('Home portfolio health check failed:', error);
  }

  const targetIp = homeIsHealthy ? homeIp : VERCEL_IP;
  const targetName = homeIsHealthy ? 'home' : 'vercel';

  try {
    const [currentIp] = await resolve4(PORTFOLIO_DOMAIN);

    if (currentIp === targetIp) {
      return NextResponse.json({ success: true, target: targetName, changed: false });
    }

    const updateUrl = new URL('https://www.duckdns.org/update');
    updateUrl.searchParams.set('domains', DUCKDNS_DOMAIN);
    updateUrl.searchParams.set('token', duckDnsToken);
    updateUrl.searchParams.set('ip', targetIp);

    const response = await fetch(updateUrl, { cache: 'no-store' });
    const result = await response.text();

    if (!response.ok || result.trim() !== 'OK') {
      throw new Error(`DuckDNS update failed with status ${response.status}.`);
    }

    console.log(`Portfolio switched to ${targetName}.`);
    return NextResponse.json({ success: true, target: targetName, changed: true });
  } catch (error) {
    console.error('Portfolio failover update failed:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
