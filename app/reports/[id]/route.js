import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Fetch the report's storage URL from the database
    const { data: report, error } = await supabase
      .from('reports')
      .select('storage_url')
      .eq('id', id)
      .single();

    if (error || !report?.storage_url) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    // Redirect the user to the actual Supabase PDF URL seamlessly
    return NextResponse.redirect(report.storage_url);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
