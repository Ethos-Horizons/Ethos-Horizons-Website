import React, { useState, useRef, useEffect } from 'react';
import { Button } from './button';
import { Label } from './label';
import { Progress } from './progress';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useImageOptimization } from '@/hooks/useImageOptimization';

interface OptimizedImageUploadProps {
  value?: string;
  onChange: (url: string, optimizedUrls?: any) => void;
  onError?: (error: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  folder?: string;
  showProgress?: boolean;
  optimizationOptions?: {
    maxFileSize?: number;
    quality?: number;
    thumbnailSize?: number;
    mediumSize?: number;
    largeSize?: number;
  };
}

export const OptimizedImageUpload: React.FC<OptimizedImageUploadProps> = ({
  value,
  onChange,
  onError,
  label = 'Image',
  placeholder = 'Upload an image',
  className = '',
  folder = 'blog-images',
  showProgress = true,
  optimizationOptions = {}
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(value);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    optimizeImage,
    isOptimizing,
    progress,
    error: optimizationError,
    cleanup
  } = useImageOptimization({
    maxFileSize: 5 * 1024 * 1024, // 5MB
    quality: 0.8,
    thumbnailSize: 150,
    mediumSize: 600,
    largeSize: 1200,
    ...optimizationOptions
  });

  // Handle optimization errors
  useEffect(() => {
    if (optimizationError && onError) {
      onError(optimizationError);
    }
  }, [optimizationError, onError]);

  // Cleanup on unmount
  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setPreviewUrl(URL.createObjectURL(file));

    try {
      // Optimize and upload the image
      const optimizedImage = await optimizeImage(file);
      
      // Call onChange with the medium size URL and all optimized URLs
      onChange(optimizedImage.urls.medium, {
        original: optimizedImage.urls.original,
        thumbnail: optimizedImage.urls.thumbnail,
        medium: optimizedImage.urls.medium,
        large: optimizedImage.urls.large
      });

      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      if (onError) {
        onError(errorMessage);
      }
      setPreviewUrl(undefined);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(undefined);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isProcessing = isUploading || isOptimizing;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <Label>{label}</Label>}
      <div className="space-y-2">
        <input 
          ref={fileInputRef} 
          type="file" 
          accept="image/*" 
          onChange={handleFileSelect} 
          className="hidden" 
        />
        
        {!previewUrl ? (
          // Upload area UI
          <div 
            onClick={handleClick} 
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
          >
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600">{placeholder}</p>
            <p className="text-xs text-gray-500 mt-1">
              Click to upload (max 5MB) • Auto-optimized for web
            </p>
          </div>
        ) : (
          // Image preview and remove button
          <div className="relative">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-48 object-cover rounded-lg border" 
            />
            <Button 
              type="button" 
              variant="destructive" 
              size="sm" 
              onClick={handleRemove} 
              className="absolute top-2 right-2"
              disabled={isProcessing}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Progress bar */}
        {showProgress && isProcessing && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {isOptimizing ? 'Optimizing image...' : 'Uploading...'}
              </span>
              <span className="text-gray-500">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {/* Upload Button (when no preview) */}
        {!previewUrl && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClick} 
            disabled={isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <ImageIcon className="w-4 h-4 mr-2" />
                Choose Image
              </>
            )}
          </Button>
        )}

        {/* URL Display */}
        {previewUrl && !isProcessing && (
          <div className="text-xs text-gray-500 break-all">
            <strong>URL:</strong> {previewUrl}
          </div>
        )}

        {/* Optimization Info */}
        {previewUrl && !isProcessing && (
          <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
            ✓ Image optimized • Multiple sizes generated • Web-ready
          </div>
        )}
      </div>
    </div>
  );
}; 