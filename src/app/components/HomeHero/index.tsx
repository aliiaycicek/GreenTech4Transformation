"use client";
import React from 'react';
import Image from 'next/image';
import styles from './HomeHero.module.css';

const HomeHero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.imageContainer}>
        <Image
          src="/assets/images/hero_background.jpg"
          alt="Hero Background"
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
    </section>
  );
};

export default HomeHero;