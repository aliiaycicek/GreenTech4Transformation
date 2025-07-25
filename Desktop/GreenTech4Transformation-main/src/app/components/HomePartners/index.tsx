"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './HomePartners.module.css';
import ScrollAnimationWrapper from '../Animations/ScrollAnimationWrapper';
import { useRipple } from '../../hooks/useRipple';

const partners = [
    { name: 'Satakunnan ammattikorkeakoulu', country: 'Finland', flag: '/assets/images/HomeScreen/finland_flag.png', link: 'https://www.samk.fi/' },
    { name: 'Windesheim University of Applied Sciences', country: 'Netherlands', flag: '/assets/images/HomeScreen/netherlands_flag.png', link: 'https://www.mastersportal.com/universities/1050/windesheim-university-of-applied-sciences.html' },
    { name: 'Technische Hochschule Rosenheim', country: 'Germany', flag: '/assets/images/HomeScreen/german_flag.png', link: 'https://www.th-rosenheim.de' },
    { name: 'Beykent University', country: 'Türkiye', flag: '/assets/images/HomeScreen/turkey_flag.png', link: 'https://www.beykent.edu.tr' },
    { name: 'Griffith College', country: 'İreland', flag: '/assets/images/HomeScreen/7238E7C2-DE05-43EC-B49C-F10E3E8ADE61_4_5005_c 1.png', link: 'https://www.educationinireland.com/en/where-can-i-study-/view-all-private-higher-education-institutions/griffith-college-dublin-introduction.html' },
    { name: 'Dublin Business Innovation Centre Limited LBG', country: 'İreland', flag: '/assets/images/HomeScreen/7238E7C2-DE05-43EC-B49C-F10E3E8ADE61_4_5005_c 1.png', link: 'http://www.dcebenterpriseguide.com/directory/Dublin-Business-Innovation-Centre' },
    { name: 'Ikigaia Oy', country: 'Finland', flag: '/assets/images/HomeScreen/finland_flag.png', link: 'https://ikigaia.fi' },
    { name: 'Wild Campus GmbH', country: 'Germany', flag: '/assets/images/HomeScreen/german_flag.png', link: 'https://www.northdata.com/Wild%20Campus%20GmbH,%20Rosenheim/Amtsgericht%20Traunstein%20HRB%2030338' },
];

const HomePartners = () => {
  useRipple([`.${styles.partnerCard}`, `.${styles.fundingBox}`]);

  return (
    <section className={styles.partners}>
      <div className={styles.container}>
        <h2 className={styles.title}>Who are we ?</h2>
        <p className={styles.subtitle}>Full partners</p>
        <div className={styles.grid}>
          {partners.map((partner, index) => (
            <ScrollAnimationWrapper key={index} delay={index * 80}>
              <Link href={partner.link} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                <div className={styles.partnerCard}>
                  <Image src={partner.flag} alt={`${partner.country} Flag`} width={40} height={40} className={styles.flag} />
                  <span className={styles.country}>{partner.country}</span>
                  <p className={styles.name}>{partner.name}</p>
                </div>
              </Link>
            </ScrollAnimationWrapper>
          ))}
        </div>
        <div className={styles.fundingWrapper}>
          <ScrollAnimationWrapper delay={0}>
            <div className={styles.fundingBox}>
              <p className={styles.fundingTitle}>Max. funding Phase 1</p>
              <div className={styles.fundingAmount}>€ 540,000</div>
            </div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper delay={150}>
            <div className={styles.fundingBox}>
              <p className={styles.fundingTitle}>Max. funding Phase 2</p>
              <div className={styles.fundingAmount}>€ 800,000</div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
};

export default HomePartners; 