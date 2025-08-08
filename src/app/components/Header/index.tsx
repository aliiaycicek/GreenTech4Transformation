"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuth();

    const handleLogout = async () => {
        setMenuOpen(false);
        await supabase.auth.signOut();
        router.push('/');
    };

    const handleMenuItemClick = () => {
        setMenuOpen(false);
    };

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
                        <Image src="/assets/images/eit-rawmaterials.png" alt="EIT RawMaterials and EU" width={200} height={48} className={styles.headerSponsorLogo} />
                        <Image src="/assets/images/-large.png" alt="Additional Logo" width={200} height={48} className={styles.headerAdditionalLogo} />
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
                <li className={`${styles.headerMenuItem} ${pathname === '/' ? styles.active : ''}`}><Link href="/" onClick={handleMenuItemClick}>Home</Link></li>
                <li className={`${styles.headerMenuItem} ${pathname === '/about' ? styles.active : ''}`}><Link href="/about" onClick={handleMenuItemClick}>About Us</Link></li>
                <li className={`${styles.headerMenuItem} ${pathname === '/partners' ? styles.active : ''}`}><Link href="/partners" onClick={handleMenuItemClick}>Partners</Link></li>
                <li className={`${styles.headerMenuItem} ${pathname === '/news' ? styles.active : ''}`}><Link href="/news" onClick={handleMenuItemClick}>News</Link></li>
                <li className={`${styles.headerMenuItem} ${pathname === '/contact' ? styles.active : ''}`}><Link href="/contact" onClick={handleMenuItemClick}>Contact</Link></li>
                {user ? (
                    <>
                        <li className={`${styles.headerMenuItem} ${pathname === '/admin/add-news' ? styles.active : ''}`}><Link href="/admin/add-news" onClick={handleMenuItemClick}>Add News</Link></li>
                        <li className={`${styles.headerMenuItem} ${styles.logoutMenuItem}`}><button onClick={handleLogout} className={styles.logoutButton}>Logout</button></li>
                    </>
                ) : (
                    <li className={`${styles.headerMenuItem} ${pathname === '/login' ? styles.active : ''}`}><Link href="/login" onClick={handleMenuItemClick}>Login</Link></li>
                )}
            </ul>
        </nav>
        {/* Overlay */}
        <div className={`${styles.drawerOverlay} ${menuOpen ? styles.active : ''}`} onClick={() => setMenuOpen(false)}></div>
        </>
    );
};

export default Header;