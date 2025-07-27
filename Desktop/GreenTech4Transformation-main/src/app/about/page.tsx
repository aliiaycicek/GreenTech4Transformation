import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';

const AboutPage = () => {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/assets/images/abot.jpg"
            alt="About Us page background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.mainTitle}>About Us</h1>
          <div className={styles.mainCard}>
            <h2 className={styles.descTitle}>Empowering Higher Education to Drive a Greener, Smarter Europe</h2>
            <ul>
              <li>GreenTech 4 Transformation (GT4T) unites universities, researchers, and entrepreneurs to turn deep-tech research into market-ready solutions for the circular economy, digital transformation, and clean energy.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.missionSection}>
        <div className={styles.container}>
          <div className={styles.aboutCard}>
            <div className={styles.cardIcon}>
              <Image src="/assets/icons/mission.png" alt="Mission icon" width={64} height={64} />
            </div>
            <h2>Mission</h2>
            <p>GT4T's mission is to strengthen the role of universities and research institutions in solving real-world challenges through circular economy strategies, clean energy transition, digital transformation, and deep-tech innovation.</p>
          </div>
          <div className={styles.aboutCard}>
            <div className={styles.cardIcon}>
              <Image src="/assets/icons/vision.png" alt="Vision icon" width={64} height={64} />
            </div>
            <h2>Vision</h2>
            <p>A Europe where innovation and sustainability shape a resilient, inclusive future. Our vision is to build a future where education, technology, and community-driven innovation lead the green and digital transition—locally and globally.</p>
          </div>
          <div className={styles.aboutCard}>
            <div className={styles.cardIcon}>
              <Image src="/assets/icons/values.png" alt="Values icon" width={64} height={64} />
            </div>
            <h2>Core Values</h2>
            <p>Collaboration, Inclusivity, Impact. GT4T believes in uniting diverse perspectives across generations and disciplines. We foster equitable access to innovation, support cross-border cooperation, and aim for scalable solutions that create long-term value for society and the environment.</p>
          </div>
        </div>
      </section>

      <section className={styles.supportersSection}>
        <div className={styles.container}>
          <h2>About Our Supporters</h2>
          <p>GT4T is proudly supported by the EIT HEI Initiative, an EU-funded program under the European Institute of Innovation and Technology (EIT). The initiative aims to strengthen the innovation capacity of higher education institutions across Europe.</p>
          <p>Our project is guided and co-funded by EIT Climate-KIC, Europe’s leading climate innovation community. EIT Climate-KIC supports impactful partnerships, deep-tech solutions, and sustainable transformation in education, business, and policy.</p>
          <p>Thanks to this strong backing, GT4T connects top institutions and partners across Finland, Germany, Ireland, Türkiye, and the Netherlands — building a united effort for a greener and more innovative Europe.</p>
        </div>
      </section>

      <section className={styles.descriptionSection}>
        <div className={styles.container}>
          <p>GreenTech 4 Transformation (GT4T) is a Europe-wide initiative empowering higher education institutions (HEIs) to become pioneers in sustainable innovation, entrepreneurship, and societal change. By focusing on critical areas like the circular economy, digital transformation, and energy transition, GT4T bridges research, education, and technology to address today's most urgent global challenges.</p>
          <p>Through nine interconnected work packages, the project fosters innovation capacity across institutions, from the launch of Venture Science Labs to challenge-based learning models and inter-university collaboration frameworks. These efforts support both young talents (ages 17–25) and experienced professionals (55+), ensuring inclusive participation in innovation across generations.</p>
          <p>The GT4T consortium consists of partners from Finland, Germany, Ireland, Türkiye, and the Netherlands, uniting academic institutions, startups, industry hubs, and policy bodies. Together, they aim to create:</p>
          <ul>
            <li>30 new start-ups</li>
            <li>60 strategic partnerships</li>
            <li>3 market-ready deep-tech solutions</li>
          </ul>
          <p>GT4T not only contributes to local and regional innovation goals but also strengthens Europe's position as a global leader in the green and digital transition. The project is supported by the EIT HEI Initiative under EIT Climate-KIC, the EU's leading climate innovation community.</p>
        </div>
      </section>
    </>
  );
};

export default AboutPage; 