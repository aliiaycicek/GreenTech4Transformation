import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

// Sadece bu e-postaların kayıt olmasına izin verilecek.
// BU LİSTEYİ KENDİ İSTEDİĞİNİZ E-POSTALARLA GÜNCELLEYİN!
// Sadece bu e-postaların kayıt olmasına izin verilecek.
// Lütfen bu listeyi kendi 10 kullanıcınızın e-posta adresleriyle güncelleyin.
const allowedEmails = [
  'aliaycicek_7010@hotmail.com',
  'seymauzan@beykent.edu.tr',
  'ali.2.tavakoli@samk.fi',
  'ozcannmelih@gmail.com'
];

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // 1. E-postanın kayıt olmasına izin verilip verilmediğini kontrol et
    if (!allowedEmails.includes(email)) {
      return NextResponse.json({ message: 'This email is not authorized to sign up' }, { status: 403 });
    }

    // 2. Supabase ile kullanıcıyı kaydet
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: error.status || 500 });
    }

    // Kullanıcı zaten var ama e-postasını doğrulamamış olabilir.
    // Supabase bu durumda bir kullanıcı nesnesi döndürür ama session null olur.
    if (data.user && !data.session) {
        return NextResponse.json({ message: 'Sign up successful! Please check your email to verify your account.' }, { status: 200 });
    }

    // Başarılı kayıt ve giriş durumu
    if (data.user && data.session) {
        return NextResponse.json({ message: 'Sign up successful!', user: data.user, session: data.session }, { status: 201 });
    }

    // Beklenmedik bir durum için fallback
    return NextResponse.json({ message: 'An unexpected issue occurred during sign up.' }, { status: 500 });
  } catch (e: any) {
    console.error('Internal Server Error:', e);
    return NextResponse.json({ message: `An internal server error occurred: ${e.message}` }, { status: 500 });
  }
}
