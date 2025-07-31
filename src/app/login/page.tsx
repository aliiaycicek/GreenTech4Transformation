"use client";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import styles from './Login.module.css';

const LoginPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/'); // Redirect if already logged in
    }
  }, [user, router]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formWrapper}>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          view="sign_in"
          providers={['google', 'github']}
        />
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <a href="/forgot-password" style={{ color: '#ccc', fontSize: '14px' }}>
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
