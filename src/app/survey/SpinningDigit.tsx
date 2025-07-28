import React from 'react';
import styles from './SpinningDigit.module.css';

interface SpinningDigitProps {
  digit: number;
}

const SpinningDigit: React.FC<SpinningDigitProps> = ({ digit }) => {
  // The height of each digit is 60px
  const position = digit * 60;

  return (
    <div className={styles.digitContainer}>
      <div
        className={styles.digitReel}
        style={{ transform: `translateY(-${position}px)` }}
      >
        {/* The reel contains all possible digits */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div key={num} className={styles.digit}>
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpinningDigit;
