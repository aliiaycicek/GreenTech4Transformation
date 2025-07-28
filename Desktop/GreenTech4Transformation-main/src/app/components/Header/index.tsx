"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const { user, logout } = useAuth();

    return (
        <>
            <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.headerLeft}>
                    <Link href="/" className={styles.headerLogo}>
                        <span className={styles.logoFull}>GreenTech4Transformation</span>
                        <span className={styles.logoShort}>GT4T</span>
                    </Link>
                    <div className={styles.headerSponsorLogos}>
                        <Image src="/assets/images/eit-rawmaterials.png" alt="EIT RawMaterials and EU" width={220} height={53} className={styles.headerSponsorLogo} />
                    </div>
                </div>
                <button className={`${styles.headerHamburger} ${menuOpen ? styles.active : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
        <nav className={`${styles.headerNav} ${menuOpen ? styles.active : ''}`}>
            <div className={styles.navHeader}>
                <button className={`${styles.headerHamburger} ${styles.active}`} onClick={() => setMenuOpen(false)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <ul className={styles.headerMenu}>
                <li className={`${styles.headerMenuItem} ${pathname === '/' ? styles.active : ''}`}><Link href="/">Home</Link></li>
                <li className={`${styles.headerMenuItem} ${pathname === '/about' ? styles.active : ''}`}><Link href="/about">About Us</Link></li>
                <li className={`${styles.headerMenuItem} ${pathname === '/partners' ? styles.active : ''}`}><Link href="/partners">Partners</Link></li>
                <li className={`${styles.headerMenuItem} ${pathname === '/news' ? styles.active : ''}`}><Link href="/news">News</Link></li>
                <li className={`${styles.headerMenuItem} ${pathname === '/contact' ? styles.active : ''}`}><Link href="/contact">Contact</Link></li>
                {user ? (
                    <>
                        <li className={`${styles.headerMenuItem} ${pathname === '/upload-news' ? styles.active : ''}`}><Link href="/upload-news">Upload News</Link></li>
                        <li className={`${styles.headerMenuItem} ${styles.logoutMenuItem}`}><button onClick={logout} className={styles.logoutButton}>Logout</button></li>
                    </>
                ) : (
                    <li className={`${styles.headerMenuItem} ${pathname === '/login' ? styles.active : ''}`}><Link href="/login">Login</Link></li>
                )}
            </ul>
        </nav>
        {/* Overlay */}
        <div className={`${styles.drawerOverlay} ${menuOpen ? styles.active : ''}`} onClick={() => setMenuOpen(false)}></div>
        </>
    );
};

export default Header; 