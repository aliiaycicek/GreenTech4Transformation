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
                        <p>GT4T&apos;s mission is to strengthen the role of universities and research institutions in solving real-world challenges through circular economy strategies, clean energy transition, digital transformation, and deep-tech innovation.</p>
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

      <section className={styles.descriptionSection}>
        <div className={styles.container}>
          <h2>About GT4T</h2>
                                        <p>GreenTech 4 Transformation (GT4T) is a Europe-wide initiative empowering higher education institutions (HEIs) to lead in sustainable innovation, entrepreneurship, and societal change. By focusing on the circular economy, digital transformation, and energy transition, GT4T bridges research, education, and technology to tackle today&apos;s most pressing global challenges.</p>

          <p>Through nine interconnected work packages, the project:</p>
          <ul>
            <li>Launches Venture Science Labs</li>
            <li>Implements challenge-based learning</li>
            <li>Builds inter-university collaboration frameworks</li>
          </ul>

          <p>These actions foster innovation among both young talents (17–25) and experienced professionals (55+), ensuring inclusive, cross-generational impact.</p>

          <p>GT4T aims to create:</p>
          <ul>
            <li>30 new start-ups</li>
            <li>60 strategic partnerships</li>
            <li>3 market-ready deep-tech solutions</li>
          </ul>

                                        <p>The consortium includes academic institutions, startups, industry hubs, and policy actors from Finland, Germany, Ireland, Türkiye, and the Netherlands — working together to strengthen Europe&apos;s role in the green and digital transition.</p>

          <hr className={styles.divider} />

          <h2>Our Supporters</h2>
          <p>GT4T is proudly supported by the EIT HEI Initiative, an EU-funded programme led by the European Institute of Innovation and Technology (EIT). The initiative aims to strengthen the innovation capacity of higher education institutions across Europe.</p>

                                        <p>Our project is also guided and co-funded by EIT Climate-KIC, Europe&apos;s leading climate innovation community. EIT Climate-KIC supports:</p>
          <ul>
            <li>Impactful partnerships</li>
            <li>Deep-tech solutions</li>
            <li>Sustainable transformation in education, business, and policy</li>
          </ul>

          <p>Thanks to this strong backing, GT4T connects top institutions and partners across Finland, Germany, Ireland, Türkiye, and the Netherlands — building a united effort for a greener and more innovative World.</p>
        </div>
      </section>
    </>
  );
};

export default AboutPage;