import React, { useState, useRef } from 'react';
import { Button } from './button';
import { Label } from './label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadImage, validateImageFile } from '@/lib/imageUpload';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onError?: (error: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  folder?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onError,
  label = 'Image',
  placeholder = 'Upload an image',
  className = '',
  folder = 'blog-images'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const validationError = validateImageFile(file);
    if (validationError) {
      onError?.(validationError);
      return;
    }

    setIsUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Supabase
      const result = await uploadImage(file, folder);
      
      if (result.error) {
        onError?.(result.error);
        setPreviewUrl(null);
      } else {
        onChange(result.url);
        setPreviewUrl(result.url);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      onError?.(errorMessage);
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <Label>{label}</Label>}
      
      <div className="space-y-2">
        {/* File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Upload Area */}
        {!previewUrl ? (
          <div
            onClick={handleClick}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
          >
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600">{placeholder}</p>
            <p className="text-xs text-gray-500 mt-1">
              Click to upload (max 5MB)
            </p>
          </div>
        ) : (
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
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Upload Button (when no preview) */}
        {!previewUrl && (
          <Button
            type="button"
            variant="outline"
            onClick={handleClick}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-2" />
                Uploading...
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
        {previewUrl && (
          <div className="text-xs text-gray-500 break-all">
            <strong>URL:</strong> {previewUrl}
          </div>
        )}
      </div>
    </div>
  );
}; 