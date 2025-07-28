"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HomeHero.module.css';

const heroSubtitles = [
  'Driving Green Innovation',
  'Building a Sustainable Future',
  'Empowering Tech Entrepreneurs',
  'Transforming Higher Education',
];

const HomeHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSubtitles.length);
    }, 5000); // 5 saniyede bir değişecek

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
       <div className={styles.heroBg}>
         <Image
           src="/assets/images/amp.jpg"
           alt="Sustainability themed background"
           fill
           style={{ objectFit: "cover" }}
           priority
         />
         <div className={styles.heroOverlay}></div>
       </div>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleFull}>GreenTech4Transformation</span>
          <span className={styles.heroTitleShort}>GT4T</span>
        </h1>
        <p key={currentIndex} className={styles.heroSubtitle}>
          <span className={styles.heroSubtitleFull}>{heroSubtitles[currentIndex]}</span>
          <span className={styles.heroSubtitleShort}>Green Innovation</span>
        </p>
      </div>
    </section>
  );
};

export default HomeHero; 