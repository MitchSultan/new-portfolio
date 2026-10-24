import { NextResponse } from 'next/server';
import { normalizeAuditUrl } from '../../../lib/pagespeed-audit';
import { createServerSupabaseClient } from '../../../lib/server-supabase';

export async function POST(request) {
  try {
    const supabase = createServerSupabaseClient();
    const body = await request.json();
    const url = body?.url;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required.' }, { status: 400 });
    }

    let normalizedUrl;
    try {
      normalizedUrl = normalizeAuditUrl(url);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid URL provided.';
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('pagespeed_jobs')
      .insert([
        {
          url: normalizedUrl,
          canonical_url: normalizedUrl,
          status: 'pending',
        },
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Failed to create PageSpeed job:', error);
      const message = error.code === 'PGRST205'
        ? 'Supabase table public.pagespeed_jobs not found. Apply the pagespeed_jobs migration.'
        : 'Unable to queue PageSpeed audit.';
      return NextResponse.json({ error: message }, { status: 500 });
    }

    return NextResponse.json({ jobId: data.id, status: 'pending' }, { status: 202 });
  } catch (error) {
    console.error('PageSpeed job creation failed:', error);
    const message = error instanceof Error
      ? error.message
      : 'Failed to queue PageSpeed audit.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
