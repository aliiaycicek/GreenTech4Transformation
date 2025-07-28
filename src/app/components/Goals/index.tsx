import React from "react";
import Image from "next/image";
import { goals } from "../Content/content";
import styles from "./Goals.module.css";

const Goals = () => {
  return (
    <section className={styles.goals}>
      <div className={styles.container}>
        <h2 className={styles.title}>{goals.title}</h2>
        <ul className={styles.goalList}>
          {goals.items.map((goal, index) => (
            <li key={index} className={styles.goalItem}>
              <div className={styles.icon}>
                <Image 
                  src="/file.svg" // Projenizdeki ikonu kullanıyoruz
                  alt="Goal Icon" 
                  width={24} 
                  height={24} 
                />
              </div>
              <p>{goal}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Goals; 