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
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#f49753',
                  brandAccent: '#e8864a',
                  brandButtonText: 'white',
                  defaultButtonBackground: '#f49753',
                  defaultButtonBackgroundHover: '#e8864a',
                  inputLabelText: '#f49753',
                  anchorTextColor: '#f49753',
                  anchorTextHoverColor: '#e8864a',
                }
              }
            },
            style: {
              label: {
                color: '#f49753',
              },
              anchor: {
                color: '#f49753',
                backgroundColor: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                textDecoration: 'none',
              },
              message: {
                color: '#f49753',
              }
            }
          }}
          theme="dark"
          providers={[]}
          redirectTo="https://www.greentech4transformation.com/update-password"
          view="sign_in"
          showLinks={true}
        />
      </div>
    </div>
  );
};

export default LoginPage;
