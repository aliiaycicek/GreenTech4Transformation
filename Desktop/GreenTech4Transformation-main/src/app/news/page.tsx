"use client";
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

const staticNewsItems = [
  {
    type: 'video',
    headline: 'GT4T Kick-Off Meeting: A Promising Start in Pori',
    content: 'Our very first GT4T consortium meeting took place on June 2–3, 2025, at SAMK Pori Campus. This Kick-Off Meeting marked a significant milestone in aligning our shared vision and setting the foundation for successful collaboration. Partners from across Europe gathered to present work packages, discuss the project’s roadmap, and enjoy a warm and inspiring social program in Yyteri and Anttoora. Thank you to everyone who contributed — the journey has officially begun!',
    videoUrl: 'https://streamable.com/e/ub2mii?',
  },
  // Gelecekte daha fazla haber (resim veya video) buraya eklenebilir.
  {
    type: 'image',
    headline: 'Second News Item with Image',
    content: 'This is the content for the second news item, which features an image instead of a video.',
    imageUrl: '/assets/images/pp.jpg',
  }
];

const NewsPage = () => {
  const [news, setNews] = useState(staticNewsItems);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadedNews = JSON.parse(localStorage.getItem('news') || '[]');
    const formattedLoadedNews = loadedNews.map((item: any) => ({
      type: 'image',
      headline: item.title,
      content: item.content,
      imageUrl: item.image, // base64 image string
    }));
    setNews([...formattedLoadedNews, ...staticNewsItems]);
  }, []);

  const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? news.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
        const isLastSlide = currentIndex === news.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

    if (news.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>News</h1>
        <p>No news available at the moment.</p>
      </div>
    );
  }

  const currentNews = news[currentIndex];

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
            ) : currentNews.imageUrl ? (
              <img src={currentNews.imageUrl} alt={currentNews.headline} className={styles.image} />
            ) : null}
          </div>
          <div className={styles.content}>
            <p className={styles.content}>{currentNews.content}</p>
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