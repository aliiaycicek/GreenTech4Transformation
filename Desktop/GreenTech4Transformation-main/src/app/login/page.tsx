"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { login, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const url = isSignUp ? '/api/signup' : '/api/login';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (isSignUp) {
          setMessage(data.message);
          setIsSignUp(false); // Kayıt sonrası giriş formuna yönlendir
        } else {
          login(email); // Yönlendirme useEffect tarafından yapılacak
        }
      } else {
        setError(data.message || 'An error occurred.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formWrapper}>
        <div className={styles.toggleButtons}>
          <button onClick={() => setIsSignUp(false)} className={!isSignUp ? styles.active : ''}>Sign In</button>
          <button onClick={() => setIsSignUp(true)} className={isSignUp ? styles.active : ''}>Sign Up</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
          {message && <p className={styles.message}>{message}</p>}
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
