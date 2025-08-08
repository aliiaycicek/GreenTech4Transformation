'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './UpdatePassword.module.css';

const UpdatePasswordPage = () => {
  console.log('DEBUG: UpdatePasswordPage component is rendering.');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [redirectTimer, setRedirectTimer] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const startCountdown = (seconds: number, callback: () => void) => {
    setCountdown(seconds);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          callback();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setRedirectTimer(timer);
  };

  useEffect(() => {
    return () => {
      if (redirectTimer) {
        clearInterval(redirectTimer);
      }
    };
  }, [redirectTimer]);

  useEffect(() => {
    console.log('DEBUG: useEffect is running.');
    const hash = window.location.hash;
    const search = window.location.search;
    console.log('DEBUG: Current URL hash:', hash);
    console.log('DEBUG: Current URL search:', search);

    // URL'de error parametresi var mı kontrol et
    if (hash.includes('error=') || search.includes('error=')) {
      const urlParams = new URLSearchParams(hash.substring(1) || search);
      const error = urlParams.get('error');
      const errorDescription = urlParams.get('error_description');
      
      console.log('DEBUG: Error detected in URL:', error, errorDescription);
      
      let errorMessage = 'Password reset link is invalid or has expired.';
      if (error === 'access_denied' && errorDescription?.includes('expired')) {
        errorMessage = 'Password reset link has expired. Please request a new password reset.';
      }
      
      setError(errorMessage);
       
       // 5 saniye sonra login sayfasına yönlendir
       startCountdown(5, () => {
         router.push('/login');
       });
    } else if (!hash.includes('access_token')) {
      console.log('DEBUG: No access_token in hash. Redirecting to login page.');
      setError('Invalid password reset link.');
       
       // 4 saniye sonra login sayfasına yönlendir
       startCountdown(4, () => {
         router.push('/login');
       });
    }
    
    // Initialization tamamlandı
    setIsInitializing(false);
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
        console.log('DEBUG: Executing redirect to /login.');
        router.push('/login');
      }, 3000);
    }
    setLoading(false);
  };

  // Sayfa yüklenirken loading göster
  if (isInitializing) {
    return (
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>Verifying Link...</h2>
            <p>Please wait while we verify your password reset link.</p>
            <div className={styles.loadingSpinner}></div>
          </div>
        </div>
      </div>
    );
  }

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
          {error && (
            <div>
              <p className={styles.error}>{error}</p>
              {countdown > 0 && (
                <p className={styles.countdown}>
                  Redirecting to login page in {countdown} seconds...
                </p>
              )}
              {error.includes('expired') && (
                <div className={styles.helpLinks}>
                  <Link href="/forgot-password" className={styles.forgotLink}>
                    Request New Password Reset Link
                  </Link>
                </div>
              )}
            </div>
          )}
          {message && <p className={styles.message}>{message}</p>}
        </form>
        <div className={styles.backToLogin}>
          <Link href="/login" className={styles.loginLink}>Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
