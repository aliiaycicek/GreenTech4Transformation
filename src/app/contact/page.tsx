"use client"
import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';

const ContactPage = () => {
  return (
    <main className={styles.container}>
      <h1 className={styles.pageTitle}>Contact</h1>
      <div className={styles.contactCard}>
        <div className={styles.info}>
          <h2>Contact Information</h2>
          <ul className={styles.contactDetails}>
            <li>
              <Image src="/assets/icons/ic_sharp-email.png" alt="Email icon" width={24} height={24} />
              <a href="mailto:ali.2.tavakoli@samk.fi">ali.2.tavakoli@samk.fi</a>
            </li>
          </ul>
        </div>

        <form className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" name="first-name" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" name="last-name" required />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" />
          </div>
          <div className={styles.formGroup}>
            <label>Select Subject</label>
            <div className={styles.radioOptions}>
              <label>
                <input type="radio" name="subject" value="General Inquiry" defaultChecked /> General Inquiry
              </label>
              <label>
                <input type="radio" name="subject" value="Partnership" /> Partnership
              </label>
              <label>
                <input type="radio" name="subject" value="Support" /> Support
              </label>
              <label>
                <input type="radio" name="subject" value="Other" /> Other
              </label>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} required></textarea>
          </div>
          <button type="submit" className={styles.button}>Send Message</button>
        </form>
      </div>
    </main>
  );
};

export default ContactPage; 