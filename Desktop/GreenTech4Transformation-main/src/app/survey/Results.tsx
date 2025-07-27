"use client";

import React from 'react';
import Image from 'next/image';
import styles from './Survey.module.css';

interface ResultsProps {
  score: number;
}

const Results: React.FC<ResultsProps> = ({ score }) => {
  const getImpactMessage = (s: number) => {
    if (s < 2000) return "Low impact";
    if (s <= 5000) return "Average";
    return "High carbon footprint!";
  };

  // Format score to have leading zeros up to 6 digits
  const formattedScore = Math.round(score).toString().padStart(6, '0').split('');

  return (
    <div className={styles.resultsContainer}>
        <div className={styles.resultsContent}>
            <h2 className={styles.resultsTitle}>Your Total Annual Carbon Footprint</h2>
            <div className={styles.scoreDisplay}>
                {formattedScore.map((digit, index) => (
                    <span key={index} className={styles.scoreDigit}>{digit}</span>
                ))}
            </div>
            <p className={styles.scoreUnit}>kg CO2</p>
            <p className={styles.impactMessage}>{getImpactMessage(score)}</p>
        </div>
        <div className={styles.resultsImage}>
            <Image
              src="/assets/images/Survey10.png" // Using the last image for results page as per design
              alt="Carbon Footprint Result"
              width={400}
              height={400}
              className={styles.surveyImage} // Re-use existing style
            />
        </div>
    </div>
  );
};

export default Results;
