import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const staticNewsItems = [
  {
    type: 'video',
    headline: 'GT4T Kick-Off Meeting: A Promising Start in Pori',
    content: 'Our very first GT4T consortium meeting took place on June 2–3, 2025, at SAMK Pori Campus. This Kick-Off Meeting marked a significant milestone in aligning our shared vision and setting the foundation for successful collaboration. Partners from across Europe gathered to present work packages, discuss the project’s roadmap, and enjoy a warm and inspiring social program in Yyteri and Anttoora. Thank you to everyone who contributed — the journey has officially begun!',
    videoUrl: 'https://streamable.com/e/ub2mii?',
    images: null,
  }
];

export async function POST() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const { data: existingData } = await supabaseAdmin
      .from('news')
      .select('headline')
      .in('headline', staticNewsItems.map(item => item.headline));

    if (existingData && existingData.length > 0) {
      return NextResponse.json({ message: 'Data already exists. No action taken.' }, { status: 200 });
    }

    const { error: insertError } = await supabaseAdmin.from('news').insert(staticNewsItems);

    if (insertError) {
      return NextResponse.json({ error: 'Failed to migrate news.', details: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'News data successfully migrated!' }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: 'An unexpected error occurred.', details: error.message }, { status: 500 });
  }
}
