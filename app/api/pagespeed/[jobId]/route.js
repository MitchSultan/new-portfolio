import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const VALID_STATUSES = ['pending', 'running', 'completed', 'failed'];

export async function GET(request, { params }) {
  const { jobId } = await params;
  if (!jobId) {
    return NextResponse.json({ error: 'Job ID is required.' }, { status: 400 });
  }

  const { data: job, error } = await supabase
    .from('pagespeed_jobs')
    .select('id,status,result,error,created_at,updated_at')
    .eq('id', jobId)
    .single();

  if (error) {
    console.error('Failed to fetch PageSpeed job:', error);
    const message = error.code === 'PGRST205'
      ? 'Supabase table public.pagespeed_jobs not found. Apply the pagespeed_jobs migration.'
      : 'Failed to fetch PageSpeed job.';
    return NextResponse.json({ error: message }, { status: 500 });
  }

  if (!job) {
    return NextResponse.json({ error: 'PageSpeed job not found.' }, { status: 404 });
  }

  return NextResponse.json(job);
}

export async function PATCH(request, { params }) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.PAGESPEED_JOB_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { jobId } = await params;
  if (!jobId) {
    return NextResponse.json({ error: 'Job ID is required.' }, { status: 400 });
  }

  const body = await request.json();
  const { status, result, error: jobError } = body;

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid status value.' }, { status: 400 });
  }

  const updates = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (result !== undefined) {
    updates.result = result;
  }

  if (jobError !== undefined) {
    updates.error = jobError;
  }

  const { data, error } = await supabase
    .from('pagespeed_jobs')
    .update(updates)
    .eq('id', jobId)
    .select('id,status,result,error,updated_at')
    .single();

  if (error) {
    console.error('Failed to update PageSpeed job:', error);
    const message = error.code === 'PGRST205'
      ? 'Supabase table public.pagespeed_jobs not found. Apply the pagespeed_jobs migration.'
      : 'Failed to update PageSpeed job.';
    return NextResponse.json({ error: message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: 'Failed to update PageSpeed job.' }, { status: 500 });
  }

  return NextResponse.json(data);
}
