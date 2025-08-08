"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import styles from './UploadNews.module.css';

const UploadNewsPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length > 3) {
        setMessage('You can upload a maximum of 3 images.');
        e.target.value = ''; // Clear the selection
        setImages([]);
        return;
      }
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || images.length === 0) {
      setMessage('Please fill all fields and select at least one image.');
      return;
    }

        const imagePromises = images.map(image => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });
    });

    try {
      const base64Images = await Promise.all(imagePromises);
      
      // Supabase'e veri kaydet
      const { data, error } = await supabase
        .from('news')
        .insert({
          type: 'image',
          headline: title,
          content: content,
          image_urls: base64Images,
          created_at: new Date().toISOString()
        })
        .select();

      if (error) {
        console.error('Supabase error:', error);
        setMessage('Error uploading news to database.');
        return;
      }

      setMessage('News uploaded successfully!');
      setTitle('');
      setContent('');
      setImages([]);
      // Formu temizle
      const fileInput = document.getElementById('image') as HTMLInputElement;
      if(fileInput) fileInput.value = '';

      setTimeout(() => router.push('/news'), 2000); // 2 saniye sonra haberler sayfasına yönlendir
    } catch (error) {
      console.error('Error converting images to base64', error);
      setMessage('There was an error processing the images.');
    }
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
            className={styles.input} // Apply styles
            accept="image/*"          // Allow only image files
            multiple                  // Allow multiple files
            onChange={handleImageChange}
            required
          />
          {images.length > 0 && (
            <div className={styles.fileList}>
              {images.map((file, index) => (
                <span key={index} className={styles.fileName}>
                  {file.name}
                </span>
              ))}
            </div>
          )}
        </div>
        {message && <p className={styles.message}>{message}</p>}
        <button type="submit" className={styles.submitButton}>Upload</button>
      </form>
    </div>
  );
};

export default UploadNewsPage;
