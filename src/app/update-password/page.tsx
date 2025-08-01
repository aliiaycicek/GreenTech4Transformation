'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import styles from './UpdatePassword.module.css';

const UpdatePasswordPage = () => {
  console.log('DEBUG: UpdatePasswordPage component is rendering.');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log('DEBUG: useEffect is running.');
    const hash = window.location.hash;
    console.log('DEBUG: Current URL hash:', hash);

    if (!hash.includes('access_token')) {
      console.log('DEBUG: No access_token in hash. Redirecting to login page.');
      setError('Invalid or expired password reset link. Redirecting to login page...');
      
      // 2 saniye sonra login sayfasına yönlendir
      setTimeout(() => {
        router.push('https://www.greentech4transformation.com/login');
      }, 2000);
    }
  }, [router]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    console.log('DEBUG: handlePasswordReset function called.');
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log('DEBUG: Password match validation failed.');
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      console.log('DEBUG: Password length validation failed.');
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');
    console.log('DEBUG: Attempting to update user password via Supabase.');

    // Şifre güncellemesi sonrası oturumu sonlandır
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error('DEBUG: Supabase updateUser error:', error);
      setError(`Error updating password: ${error.message}`);
    } else {
      console.log('DEBUG: Password updated successfully. Signing out and redirecting to login in 3 seconds.');
      setMessage('Your password has been updated successfully! You will be redirected to the login page.');
      
      // Oturumu sonlandır
      await supabase.auth.signOut();
      
      setTimeout(() => {
        console.log('DEBUG: Executing redirect to login page.');
        router.push('https://www.greentech4transformation.com/login');
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2>Set a New Password</h2>
        <p>Please enter your new password below.</p>
        <form onSubmit={handlePasswordReset}>
          <div className={styles.formGroup}>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>
          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
