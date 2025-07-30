"use client";
import React from 'react';
import Image from 'next/image';
import styles from './HomeHero.module.css';

const HomeHero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>Dönüşüm için Yeşil Teknoloji</h1>
        <p className={styles.subtitle}>Sürdürülebilir bir gelecek için yenilikçi çözümler ve ortaklıklar.</p>
      </div>
      <div className={styles.heroImage}>
        <Image
          src="/hero-image.jpg" // Bu görselin public klasöründe olduğundan emin olun
          alt="Yeşil Teknoloji"
          width={600}
          height={400}
          priority
        />
      </div>
    </section>
  );
};

export default HomeHero; 