import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '../../../lib/server-supabase';

export async function GET(request, { params }) {
  try {
    const supabase = createServerSupabaseClient({ serviceRole: false });
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
