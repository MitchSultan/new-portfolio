import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { normalizeAuditUrl } from '../../../lib/pagespeed-audit';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  try {
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
