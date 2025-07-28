"use client";
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

type NewsItem = {
  type: 'video' | 'image';
  headline: string;
  content: string;
  videoUrl?: string;
  images?: string[];
};

const staticNewsItems: NewsItem[] = [
  {
    type: 'video',
    headline: 'GT4T Kick-Off Meeting: A Promising Start in Pori',
    content: 'Our very first GT4T consortium meeting took place on June 2–3, 2025, at SAMK Pori Campus. This Kick-Off Meeting marked a significant milestone in aligning our shared vision and setting the foundation for successful collaboration. Partners from across Europe gathered to present work packages, discuss the project’s roadmap, and enjoy a warm and inspiring social program in Yyteri and Anttoora. Thank you to everyone who contributed — the journey has officially begun!',
    videoUrl: 'https://streamable.com/e/ub2mii?',
  }
];

const NewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>(staticNewsItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadedNews = JSON.parse(localStorage.getItem('news') || '[]');
    const formattedLoadedNews: NewsItem[] = loadedNews.map((item: any) => ({
      type: 'image',
      headline: item.title,
      content: item.content,
      images: item.images,
    }));
    setNews([...formattedLoadedNews, ...staticNewsItems]);
  }, []);



  const currentNews: NewsItem | null = news.length > 0 ? news[currentIndex] : null;

  useEffect(() => {
    setCurrentImageIndex(0); // Reset on news change

    if (!currentNews || !currentNews.images || currentNews.images.length <= 1) {
      return; // No slider needed for 0 or 1 image
    }

    const timer = setInterval(() => {
      setCurrentImageIndex(prevIndex => {
        if (!currentNews || !currentNews.images) return 0; // Should not happen, but for type safety
        return prevIndex === currentNews.images.length - 1 ? 0 : prevIndex + 1;
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
            {currentNews.type === 'video' && currentNews.videoUrl ? (
              <div className={styles.videoContainer}>
                <iframe
                  src={currentNews.videoUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={currentNews.headline}
                ></iframe>
              </div>
            ) : currentNews.images && currentNews.images.length > 0 ? (
              <div className={styles.imageSlider}>
                <img key={currentImageIndex} src={currentNews.images[currentImageIndex]} alt={currentNews.headline} className={styles.image} />
                {currentNews.images.length > 1 && (
                  <div className={styles.dotsContainer}>
                    {currentNews.images.map((_: string, index: number) => (
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