import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerInfo}>
                    <Link href="/" className={styles.footerBrand}>
                        GreenTech4Transformation
                    </Link>
                    <div className={styles.footerLogosCombined}>
                        <Image src="/assets/images/eit-rawmaterials.png" alt="EIT RawMaterials" width={200} height={48} className={styles.footerLogoImg} />
                        <Image src="/assets/images/-large.png" alt="Additional Logo" width={200} height={48} className={styles.footerAdditionalLogo} />
                    </div>
                </div>
                <div className={styles.footerLinks}>
                    <div className={styles.footerTitle}>Links</div>
                    <ul>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/partners">Partners</Link></li>
                        <li><Link href="/news">News</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className={styles.footerLinks}>
                    <div className={styles.footerTitle}>Contact</div>
                    <ul>
                        <li><a href="mailto:ali.2.tavakoli@samk.fi">ali.2.tavakoli@samk.fi</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;