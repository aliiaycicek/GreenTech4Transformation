"use client";

import React from 'react';
import Image from 'next/image';
import styles from './ProjectDetails.module.css';
import ScrollAnimationWrapper from '../Animations/ScrollAnimationWrapper';
import { useRipple } from '../../hooks/useRipple';

const ProjectDetails = () => {
    useRipple([`.${styles.coordinatorCard}`]);

    return (
        <section className={styles.projectDetails}>
            <div className={styles.container}>
                <div className={styles.coordinatorCard}>
                    <ScrollAnimationWrapper>
                        <a href="mailto:ali@example.com" className={styles.mailLink}>
                            <div className={styles.imgContainer}>
                                <Image src="/assets/images/HomeScreen/netherlands_flag.png" alt="Netherlands Flag" width={60} height={60} />
                                <span className={styles.role}>Project Coordinator</span>
                                <span className={styles.org}>Satakunnan Koulutuskuntayhtymä</span>
                            </div>
                            <div className={styles.mainInfo}>
                                <span className={styles.name}>Ali Tavakoli</span>
                            </div>
                        </a>
                    </ScrollAnimationWrapper>
                </div>
                <div className={styles.timelineCard}>
                    <ScrollAnimationWrapper delay={200}>
                        <h3 className={styles.timelineTitle}>Project Timeline</h3>
                        <div className={styles.timeline}>
                            <div className={styles.line}></div>
                            <div className={`${styles.item}`} style={{ left: '5%' }}>
                                <div className={styles.dot}></div>
                                <div className={`${styles.date} ${styles.dateTop}`}>Apr 2025</div>
                            </div>
                            <div className={`${styles.item}`} style={{ left: '23%' }}>
                                <div className={styles.dot}></div>
                                <div className={`${styles.date} ${styles.dateBottom}`}>Dec 2025</div>
                            </div>
                            <div className={`${styles.item}`} style={{ left: '41%' }}>
                                <div className={styles.dot}></div>
                                <div className={`${styles.date} ${styles.dateTop}`}>Jan 2026</div>
                            </div>
                            <div className={`${styles.item}`} style={{ left: '59%' }}>
                                <div className={styles.dot}></div>
                                <div className={`${styles.date} ${styles.dateBottom}`}>Dec 2026</div>
                            </div>
                            <div className={`${styles.item}`} style={{ left: '77%' }}>
                                <div className={styles.dot}></div>
                                <div className={`${styles.date} ${styles.dateTop}`}>Jan 2027</div>
                            </div>
                            <div className={`${styles.item}`} style={{ left: '95%' }}>
                                <div className={styles.dot}></div>
                                <div className={`${styles.date} ${styles.dateBottom}`}>Apr 2027</div>
                            </div>
                            <div className={`${styles.phase}`} style={{ left: '14%' }}>Phase 1</div>
                            <div className={`${styles.phase} ${styles.phaseTop}`} style={{ left: '50%' }}>Phase 2a</div>
                            <div className={`${styles.phase}`} style={{ left: '86%' }}>Phase 2b</div>
                        </div>
                    </ScrollAnimationWrapper>
                </div>
            </div>
        </section>
    );
};

export default ProjectDetails; 