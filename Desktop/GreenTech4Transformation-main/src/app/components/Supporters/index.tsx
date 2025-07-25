import React from 'react';
import Image from 'next/image';
import styles from './Supporters.module.css';

const Supporters = () => {
  return (
    <section className={styles.supporters}>
      <div className={styles.supportersBg}>
        <Image
          src="/assets/images/at.jpg"
          alt="Supporters Background"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
        />
        <div className={styles.supportersOverlay}></div>
      </div>
      <div className={styles.supportersContainer}>
        <div className={styles.supportersWrapper}>
          <div className={styles.supporterItem}>
            <p className={styles.supporterItemTitle}>Supported by</p>
            <div className={styles.logoContainer}>
              <Image
                src="/assets/images/suporteddcartına.png"
                alt="Supported by Logo"
                width={250}
                height={80}
                className={styles.logoImage}
              />
            </div>
          </div>
          <div className={styles.supporterItem}>
            <p className={styles.supporterItemTitle}>Coordinated by</p>
            <div className={styles.logoContainer}>
              <Image
                src="/assets/images/cordınatıkı.png"
                alt="Coordinated by Logo"
                width={250}
                height={80}
                className={styles.logoImage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Supporters; 