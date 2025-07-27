"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './SurveyCTA.module.css';

const SurveyCTA = () => {
  return (
    <section className={styles.ctaSection}>
      <Image
        src="/assets/images/Survey.png"
        alt="A power plant with a wind turbine"
        layout="fill"
        objectFit="cover"
        quality={100}
        className={styles.bgImage}
      />
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.leftContent}>
          <h2 className={styles.title}>Calculate Your Carbon Footprint</h2>
        </div>
        <div className={styles.rightContent}>
          <p className={styles.subtitle}>Take a Green Step<br/>for the Future!</p>
          <Link href="/survey" className={styles.ctaButton}>
            Get Started <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SurveyCTA;
