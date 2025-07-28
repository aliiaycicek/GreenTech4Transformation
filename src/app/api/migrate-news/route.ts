import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

// Data copied from /app/news/page.tsx
const staticNewsItems = [
  {
    type: 'video',
    headline: 'GT4T Kick-Off Meeting: A Promising Start in Pori',
    content: 'Our very first GT4T consortium meeting took place on June 2–3, 2025, at SAMK Pori Campus. This Kick-Off Meeting marked a significant milestone in aligning our shared vision and setting the foundation for successful collaboration. Partners from across Europe gathered to present work packages, discuss the project’s roadmap, and enjoy a warm and inspiring social program in Yyteri and Anttoora. Thank you to everyone who contributed — the journey has officially begun!',
    videoUrl: 'https://streamable.com/e/ub2mii?',
    images: null, // Ensure all columns are present, even if null
  }
];

export async function POST() {
  try {
    // Check if data already exists to prevent duplicates
    const { data: existingData, error: selectError } = await supabase
      .from('news')
      .select('headline')
      .in('headline', staticNewsItems.map(item => item.headline));

    if (selectError) {
      console.error('Error checking for existing news:', selectError);
      return NextResponse.json({ error: 'Error checking for existing news', details: selectError.message }, { status: 500 });
    }

    if (existingData && existingData.length > 0) {
      return NextResponse.json({ message: 'Data has already been migrated. No action was taken.' }, { status: 200 });
    }

    // Insert data if it doesn't exist
    const { error: insertError } = await supabase.from('news').insert(staticNewsItems);

    if (insertError) {
      console.error('Error migrating news:', insertError);
      return NextResponse.json({ error: 'Failed to migrate news data.', details: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'News data successfully migrated to Supabase!' }, { status: 200 });

  } catch (error: any) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.', details: error.message }, { status: 500 });
  }
}
