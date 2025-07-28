"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './page.module.css';

const AddNewsPage = () => {
  const [headline, setHeadline] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'video' | 'image'>('image');
  const [videoUrl, setVideoUrl] = useState('');
  const [images, setImages] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Submitting...');

    // Basic validation
    if (!headline || !content) {
      setMessage('Headline and content are required.');
      return;
    }

    const newsData = {
      headline,
      content,
      type,
      videoUrl: type === 'video' ? videoUrl : null,
      images: type === 'image' ? images.split(',').map(url => url.trim()) : [],
    };

    const { error } = await supabase.from('news').insert([newsData]);

    if (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Error inserting news:', error);
    } else {
      setMessage('News item added successfully!');
      // Reset form
      setHeadline('');
      setContent('');
      setType('image');
      setVideoUrl('');
      setImages('');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New News Item</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="headline">Headline</label>
          <input
            id="headline"
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
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
          <label htmlFor="type">Type</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value as 'video' | 'image')}>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>
        {type === 'video' && (
          <div className={styles.formGroup}>
            <label htmlFor="videoUrl">Video URL</label>
            <input
              id="videoUrl"
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://example.com/video.mp4"
            />
          </div>
        )}
        {type === 'image' && (
          <div className={styles.formGroup}>
            <label htmlFor="images">Image URLs (comma-separated)</label>
            <input
              id="images"
              type="text"
              value={images}
              onChange={(e) => setImages(e.target.value)}
              placeholder="/url/to/image1.jpg, /url/to/image2.jpg"
            />
          </div>
        )}
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default AddNewsPage;
