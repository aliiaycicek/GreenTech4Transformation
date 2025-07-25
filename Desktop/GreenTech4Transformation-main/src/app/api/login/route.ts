import { NextResponse } from 'next/server';

// Şimdilik izin verilen e-postaları burada saklıyoruz.
const allowedEmails = ['test1@test.com', 'test2@test.com'];

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (allowedEmails.includes(email)) {
      // Başarılı giriş
      return NextResponse.json({ success: true, message: 'Login successful' }, { status: 200 });
    } else {
      // Yetkisiz giriş denemesi
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
  } catch (error) {
    // Hata durumunda
    return NextResponse.json({ success: false, message: 'An error occurred' }, { status: 500 });
  }
}
