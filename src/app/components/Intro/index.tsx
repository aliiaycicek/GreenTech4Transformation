"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Intro.module.css';
import { useRipple } from '../../hooks/useRipple';

const Intro = () => {
  useRipple([`.${styles.button}`]);

  return (
    <section className={styles.intro}>
      <div className={styles.container}> {/* This is the main white card */}
        <h2 className={styles.title}>
                    GT4T empowers innovation, sustainability, and entrepreneurship in higher education.
        </h2>
        <p className={styles.description}>
                              By connecting students, researchers, and industries, it tackles Europe&apos;s greatest challenges in green tech, circular economy, and digital transformation.
        </p>
        <Link href="/about" className={styles.button}>
          Learn More
        </Link>
        <div className={styles.imageContainer}>
          <Image 
            src="/assets/images/dda.jpg" 
            alt="Nature and technology theme" 
            fill
            className={styles.introImage}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};

export default Intro;