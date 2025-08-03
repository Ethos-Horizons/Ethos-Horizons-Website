import { useState, useCallback } from 'react';
import { uploadImage } from '@/lib/imageUpload';

export interface OptimizedImage {
  original: File;
  compressed: File;
  thumbnail: File;
  medium: File;
  large: File;
  urls: {
    original: string;
    thumbnail: string;
    medium: string;
    large: string;
  };
}

export interface OptimizationOptions {
  maxFileSize?: number; // in bytes (5MB = 5 * 1024 * 1024)
  quality?: number; // 0-1
  thumbnailSize?: number; // width in pixels
  mediumSize?: number; // width in pixels
  largeSize?: number; // width in pixels
}

export const useImageOptimization = (options: OptimizationOptions = {}) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const {
    maxFileSize = 5 * 1024 * 1024, // 5MB default
    quality = 0.8,
    thumbnailSize = 150,
    mediumSize = 600,
    largeSize = 1200
  } = options;

  // Create canvas and compress image
  const compressImage = useCallback((file: File, maxWidth: number, quality: number): Promise<File> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions maintaining aspect ratio
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        const newWidth = img.width * ratio;
        const newHeight = img.height * ratio;

        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw and compress
        ctx?.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          file.type,
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }, []);

  // Optimize image and generate multiple sizes
  const optimizeImage = useCallback(async (file: File): Promise<OptimizedImage> => {
    setError(null);
    setIsOptimizing(true);
    setProgress(0);

    try {
      // Validate file size
      if (file.size > maxFileSize) {
        throw new Error(`File size exceeds ${Math.round(maxFileSize / (1024 * 1024))}MB limit`);
      }

      setProgress(10);

      // Generate different sizes
      const [thumbnail, medium, large] = await Promise.all([
        compressImage(file, thumbnailSize, quality),
        compressImage(file, mediumSize, quality),
        compressImage(file, largeSize, quality)
      ]);

      setProgress(60);

      // Upload all versions to Supabase
      const uploadPromises = [
        uploadImage(thumbnail, 'thumbnails'),
        uploadImage(medium, 'medium'),
        uploadImage(large, 'large'),
        uploadImage(file, 'original') // Keep original for high-res needs
      ];

      const results = await Promise.all(uploadPromises);
      setProgress(90);

      // Check for upload errors
      const uploadErrors = results.filter(result => result.error);
      if (uploadErrors.length > 0) {
        throw new Error(`Upload failed: ${uploadErrors[0].error}`);
      }

      const optimizedImage: OptimizedImage = {
        original: file,
        compressed: large, // Use large as the main compressed version
        thumbnail,
        medium,
        large,
        urls: {
          original: results[3].url,
          thumbnail: results[0].url,
          medium: results[1].url,
          large: results[2].url
        }
      };

      setProgress(100);
      setIsOptimizing(false);
      return optimizedImage;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Optimization failed');
      setIsOptimizing(false);
      throw err;
    }
  }, [maxFileSize, quality, thumbnailSize, mediumSize, largeSize, compressImage]);

  // Get appropriate image URL based on context
  const getImageUrl = useCallback((urls: OptimizedImage['urls'], context: 'thumbnail' | 'medium' | 'large' | 'original' = 'medium') => {
    return urls[context];
  }, []);

  // Clean up function to remove temporary URLs
  const cleanup = useCallback(() => {
    setProgress(0);
    setError(null);
    setIsOptimizing(false);
  }, []);

  return {
    optimizeImage,
    getImageUrl,
    isOptimizing,
    progress,
    error,
    cleanup
  };
}; 