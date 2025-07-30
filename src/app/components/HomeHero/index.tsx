"use client";
import React from 'react';
import Image from 'next/image';
import styles from './HomeHero.module.css';

const HomeHero = () => {
  return (
    <section className={styles.hero}>
      <div style={{ position: 'relative', width: '100%', height: '60vh' }}>
        <Image
          src="/assets/images/amp.jpg"
          alt="AMP Energy"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </section>
  );
};

export default HomeHero; 