import React from "react";
import Image from "next/image";
import { news } from "../Content/content";
import styles from "./News.module.css";

const News = () => {
  return (
    <section className={styles.news}>
      <div className={styles.container}>
        <h2 className={styles.title}>{news.title}</h2>
        <div className={styles.newsGrid}>
          {news.items.map((item, index) => (
            <div key={index} className={styles.newsCard}>
              <div className={styles.icon}>
                <Image
                  src="/globe.svg" // Projenizdeki ikonu kullanıyoruz
                  alt="News Icon"
                  width={40}
                  height={40}
                />
              </div>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News; 