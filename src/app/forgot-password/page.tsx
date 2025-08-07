'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './ForgotPassword.module.css';
import Link from 'next/link';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    // Her zaman canlı ortam URL'sini kullan
    const redirectTo = 'https://www.greentech4transformation.com/update-password';
    
    console.log('Using redirectTo URL:', redirectTo);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo,
    });

    if (error) {
      setError(`Error: ${error.message}`);
    } else {
      setMessage('Password reset link has been sent to your email. Please check your inbox.');
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Forgot Password</h2>
        <p className={styles.description}>Enter your email address and we will send you a link to reset your password.</p>
        <form onSubmit={handlePasswordResetRequest}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.message}>{message}</p>}
        </form>
        <div className={styles.backToLogin}>
          <Link href="/login" className={styles.loginLink}>Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
