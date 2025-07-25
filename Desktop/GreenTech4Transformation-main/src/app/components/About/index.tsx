import React from "react";
import { about } from "../Content/content";
import styles from "./About.module.css";

const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.title}>{about.title}</h2>
        <p className={styles.description}>{about.description}</p>
      </div>
    </section>
  );
};

export default About; 