"use client";

export const dynamic = 'force-dynamic';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './page.module.css';
import Image from 'next/image';

type NewsItem = {
  id: string;
  type: 'video' | 'image';
  headline: string;
  content: string;
  video_url?: string | null;
  image_url?: string[] | null;
};

const NewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null); // Reset error on new fetch
      const { data, error } = await supabase
        .from('news')
        .select('id, type, headline, content, video_url, image_url')
        .order('created_at', { ascending: false })
        .returns<NewsItem[]>();

      if (error) {
        console.error('Full Supabase error object:', error);
        setError(error.message);
      } else if (data) {
        console.log('Data received from Supabase:', data);
        // Özellikle image_urls alanını kontrol edelim
        data.forEach((item, index) => {
          console.log(`Haber ${index + 1} - ID: ${item.id}`);
          console.log(`  - Type: ${item.type}`);
          console.log(`  - Headline: ${item.headline}`);
          console.log(`  - Image URL:`, item.image_url);
          console.log(`  - Video URL:`, item.video_url);
          console.log('---');
        });
        setNews(data);
      }
      setLoading(false);
    };

    fetchNews();
  }, []);



  const currentNews: NewsItem | null = news.length > 0 ? news[currentIndex] : null;

  useEffect(() => {
    setCurrentImageIndex(0); // Reset on news change

    if (!currentNews || !currentNews.image_url || currentNews.image_url.length <= 1) {
      return; // No slider needed for 0 or 1 image
    }

    const timer = setInterval(() => {
      setCurrentImageIndex(prevIndex => {
        if (!currentNews || !currentNews.image_url) return 0; // Should not happen, but for type safety
        return prevIndex === currentNews.image_url.length - 1 ? 0 : prevIndex + 1;
      });
    }, 4500); // 4.5 seconds

    return () => clearInterval(timer);
  }, [currentIndex, currentNews]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? news.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    if (news.length === 0) return;
    const isLastSlide = currentIndex === news.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>News</h1>
        <p>Loading news...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>An Error Occurred</h1>
        <p className={styles.errorMessage}>Could not fetch news data.</p>
        <pre className={styles.errorDetails}>Error: {error}</pre>
      </div>
    );
  }

  if (!currentNews) {
    return (
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>News</h1>
        <p>No news available at the moment.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>News</h1>
      <div className={styles.newsSlider}>
        <button onClick={goToPrevious} className={`${styles.arrow} ${styles.arrowLeft}`} aria-label="Previous news">
          &#8592;
        </button>
        <div className={styles.newsCard}>
          <h2 className={styles.headline}>{currentNews.headline}</h2>
          <div className={styles.media}>
            {currentNews.type === 'video' && currentNews.video_url ? (
              <div className={styles.videoContainer}>
                <iframe
                  src={currentNews.video_url}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={currentNews.headline}
                ></iframe>
              </div>
            ) : currentNews.image_url && currentNews.image_url.length > 0 ? (
              <div className={styles.imageSlider}>
                {/* Görsel render edilmeden önce URL'i konsola yazdıralım */}
                {(() => {
                  console.log('Render edilecek görsel URL:', currentNews.image_url[currentImageIndex]);
                  return null;
                })()}
                <Image
                  key={currentImageIndex}
                  src={currentNews.image_url[currentImageIndex]}
                  alt={currentNews.headline}
                  fill
                  style={{ objectFit: 'cover' }}
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {currentNews.image_url.length > 1 && (
                  <div className={styles.dotsContainer}>
                                        {currentNews.image_url.map((imageUrl: string, index: number) => (
                      <div
                        key={index}
                        className={`${styles.dot} ${currentImageIndex === index ? styles.activeDot : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </div>
          <div className={styles.content}>
            <p>{currentNews.content}</p>
          </div>
        </div>
        <button onClick={goToNext} className={`${styles.arrow} ${styles.arrowRight}`} aria-label="Next news">
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default NewsPage;