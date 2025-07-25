import React from "react";
import { hero, images } from "../Content/content";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section 
      className={styles.hero} 
      style={{ backgroundImage: `url(${images.heroBackground})` }}
    >
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>{hero.title}</h1>
        <h2 className={styles.subtitle}>{hero.subtitle}</h2>
        <div className={styles.slogans}>
          {hero.slogans.map((slogan, index) => (
            <p key={index}>{slogan}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero; 