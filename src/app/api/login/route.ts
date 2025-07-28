import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: error.status || 500 });
    }

    if (data.user) {
      return NextResponse.json({ message: 'Sign in successful!', user: data.user, session: data.session }, { status: 200 });
    }

    return NextResponse.json({ message: 'An unexpected error occurred during sign in.' }, { status: 500 });

  } catch (e: unknown) {
    console.error('Internal Server Error in Login:', e);
    if (e instanceof Error) {
      return NextResponse.json({ message: `An internal server error occurred: ${e.message}` }, { status: 500 });
    }
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
