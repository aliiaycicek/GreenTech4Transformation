"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './page.module.css';

const AddNewsPage = () => {
  const [headline, setHeadline] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('image'); // Default to image
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    if (e.target.files) {
      if (type === 'image' && e.target.files.length > 3) {
        setError('You can upload a maximum of 3 images.');
        return;
      }
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!headline || !content || selectedFiles.length === 0) {
      setError('Please fill in all fields and select at least one file.');
      return;
    }

    setLoading(true);

    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
        }

        const { data: urlData } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);
          
        if (!urlData) {
            throw new Error(`Could not get public URL for ${file.name}.`);
        }

        return urlData.publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      const newsData = {
        headline,
        content,
        type,
        video_url: type === 'video' ? uploadedUrls[0] : null,
        image_urls: type === 'image' ? uploadedUrls : [],
      };

      const { error: insertError } = await supabase.from('news').insert([newsData]);

      if (insertError) {
        throw insertError;
      }

      setMessage('News item added successfully!');
      // Reset form
      setHeadline('');
      setContent('');
      setSelectedFiles([]);
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`An error occurred: ${errorMessage}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add News</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="headline">Headline</label>
          <input
            type="text"
            id="headline"
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
          <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="file-input">
            {type === 'video' ? 'Upload Video' : 'Upload Images (Max 3)'}
          </label>
          <input
            type="file"
            id="file-input"
            onChange={handleFileChange}
            accept={type === 'video' ? 'video/*' : 'image/*'}
            multiple={type === 'image'}
            required
            className={styles.fileInput}
          />
          {selectedFiles.length > 0 && (
            <p className={styles.fileName}>
              {selectedFiles.length} file(s) selected: {selectedFiles.map(f => f.name).join(', ')}
            </p>
          )}
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Uploading...' : 'Submit'}
        </button>
      </form>
      {message && <p className={styles.successMessage}>{message}</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default AddNewsPage;
