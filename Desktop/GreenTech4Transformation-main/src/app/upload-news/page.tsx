"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import styles from './UploadNews.module.css';

const UploadNewsPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !image) {
      setMessage('Please fill all fields and select an image.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const newNews = {
        id: Date.now(),
        title,
        content,
        image: reader.result as string,
        author: user?.email,
        createdAt: new Date().toISOString(),
      };

      const existingNews = JSON.parse(localStorage.getItem('news') || '[]');
      localStorage.setItem('news', JSON.stringify([newNews, ...existingNews]));

      setMessage('News uploaded successfully!');
      setTitle('');
      setContent('');
      setImage(null);
      // Formu temizle
      const fileInput = document.getElementById('image') as HTMLInputElement;
      if(fileInput) fileInput.value = '';

      setTimeout(() => router.push('/news'), 2000); // 2 saniye sonra haberler sayfasına yönlendir
    };
  };

  // Kullanıcı yoksa, yönlendirme gerçekleşene kadar bir şey gösterme
  if (!user) {
    return null;
  }

  return (
    <div className={styles.uploadContainer}>
      <form onSubmit={handleSubmit} className={styles.uploadForm}>
        <h2>Upload News</h2>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        {message && <p className={styles.message}>{message}</p>}
        <button type="submit" className={styles.submitButton}>Upload</button>
      </form>
    </div>
  );
};

export default UploadNewsPage;
