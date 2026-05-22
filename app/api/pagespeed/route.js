import { NextResponse } from 'next/server';
import { runPageSpeedAudit } from '../../../lib/pagespeed-audit';

export async function POST(request) {
  try {
    const body = await request.json();
    const url = body?.url;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required.' }, { status: 400 });
    }

    const apiKey = process.env.PAGE_INSIGHTS_API_KEY;
    const results = await runPageSpeedAudit(url, apiKey);

    return NextResponse.json(results);
  } catch (error) {
    console.error('PageSpeed audit failed:', error);
    const message = error instanceof Error ? error.message : 'Failed to run PageSpeed audit.';
    const status = message.includes('not configured') ? 503 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
