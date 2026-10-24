import { NextResponse } from 'next/server';
import { runPageSpeedAudit } from '../../../../../lib/pagespeed-audit';
import { createServerSupabaseClient } from '../../../../../lib/server-supabase';

export const maxDuration = 60; // Set timeout to 60 seconds

export async function POST(request, { params }) {
  const { jobId } = await params;
  if (!jobId) {
    return NextResponse.json({ error: 'Job ID is required.' }, { status: 400 });
  }

  let supabase;
  try {
    supabase = createServerSupabaseClient();
  } catch (error) {
    console.error('PageSpeed Supabase configuration failed:', error);
    return NextResponse.json({ error: 'PageSpeed storage is not configured.' }, { status: 500 });
  }

  // Fetch job
  const { data: job, error: fetchError } = await supabase
    .from('pagespeed_jobs')
    .select('id,url,status')
    .eq('id', jobId)
    .single();

  if (fetchError || !job) {
    return NextResponse.json({ error: 'Job not found.' }, { status: 404 });
  }

  if (job.status !== 'pending') {
    return NextResponse.json({ message: 'Job is already running or completed.' }, { status: 200 });
  }

  // Set status to running
  await supabase
    .from('pagespeed_jobs')
    .update({ status: 'running', updated_at: new Date().toISOString() })
    .eq('id', jobId);

  try {
    const apiKey = process.env.PAGE_INSIGHTS_API_KEY || process.env.PAGESPEED_API_KEY;
    if (!apiKey) {
      throw new Error('PageSpeed API key is missing.');
    }
    const results = await runPageSpeedAudit(job.url, apiKey);

    // Update with results
    await supabase
      .from('pagespeed_jobs')
      .update({
        status: 'completed',
        result: results,
        updated_at: new Date().toISOString(),
      })
      .eq('id', jobId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Audit run failed:', err);
    await supabase
      .from('pagespeed_jobs')
      .update({
        status: 'failed',
        error: err instanceof Error ? err.message : 'Unknown error occurred.',
        updated_at: new Date().toISOString(),
      })
      .eq('id', jobId);

    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
