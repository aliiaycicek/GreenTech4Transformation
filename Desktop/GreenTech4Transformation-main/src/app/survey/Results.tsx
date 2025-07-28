"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SpinningDigit from './SpinningDigit';
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

  const [displayScore, setDisplayScore] = useState([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const finalScore = Math.round(score).toString().padStart(6, '0').split('').map(Number);
    // Delay setting the score to allow for animation
    const timer = setTimeout(() => {
      setDisplayScore(finalScore);
    }, 100);

    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className={styles.resultsContainer}>
        <div className={styles.resultsContent}>
            <h2 className={styles.resultsTitle}>Your Total Annual Carbon Footprint</h2>
            <div className={styles.scoreDisplay}>
              {displayScore.map((digit, index) => (
                <SpinningDigit 
                  key={index} 
                  digit={digit}
                />
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
