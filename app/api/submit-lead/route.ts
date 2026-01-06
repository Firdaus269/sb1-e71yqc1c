import { NextResponse } from 'next/server';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobile, email } = body;

    if (!name || !mobile || !email) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      console.error('Supabase is not configured');
      return NextResponse.json(
        { error: 'Database service is not configured. Please contact support.' },
        { status: 503 }
      );
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          name,
          mobile,
          email,
          status: 'new',
        },
      ])
      .select()
      .maybeSingle();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
