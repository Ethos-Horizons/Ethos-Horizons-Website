import { supabasePublic } from './supabase';

export interface UploadResult {
  url: string;
  path: string;
  error?: string;
}

export const uploadImage = async (file: File, folder: string = 'blog-images'): Promise<UploadResult> => {
  try {
    // Validate file type and size
    const validation = validateImageFile(file);
    if (validation) {
      throw new Error(validation);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}-${randomString}.${fileExtension}`;
    const filePath = `${folder}/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabasePublic.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabasePublic.storage
      .from('images')
      .getPublicUrl(filePath);

    return {
      url: urlData.publicUrl,
      path: filePath
    };
  } catch (error) {
    return {
      url: '',
      path: '',
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
};

export const deleteImage = async (filePath: string): Promise<boolean> => {
  try {
    const { error } = await supabasePublic.storage
      .from('images')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

// Helper function to validate image file
export const validateImageFile = (file: File): string | null => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return 'File must be an image (JPEG, PNG, GIF, etc.)';
  }

  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return 'File size must be less than 5MB';
  }

  return null; // No error
}; 