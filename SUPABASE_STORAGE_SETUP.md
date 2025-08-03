# Supabase Storage Setup Guide

## Prerequisites
- Supabase project already set up
- Environment variables configured

## Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Configure the bucket:
   - **Name**: `images`
   - **Public bucket**: ✅ Check this (so images can be accessed publicly)
   - **File size limit**: 5MB (or your preferred limit)
   - **Allowed MIME types**: `image/*` (or specific types like `image/jpeg,image/png,image/gif`)

## Step 2: Configure Storage Policies

After creating the bucket, you need to set up Row Level Security (RLS) policies:

### Policy 1: Allow Public Read Access
```sql
-- Allow anyone to view images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');
```

### Policy 2: Allow Authenticated Users to Upload
```sql
-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
```

### Policy 3: Allow Users to Update Their Own Images
```sql
-- Allow users to update their own images
CREATE POLICY "Users can update own images" ON storage.objects 
FOR UPDATE USING (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### Policy 4: Allow Users to Delete Their Own Images
```sql
-- Allow users to delete their own images
CREATE POLICY "Users can delete own images" ON storage.objects 
FOR DELETE USING (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## Step 3: Test the Setup

1. Try uploading an image through the CMS
2. Check that the image appears in your Supabase Storage dashboard
3. Verify the public URL works by opening it in a browser

## Troubleshooting

### Common Issues:

1. **"Bucket not found" error**
   - Make sure the bucket name is exactly `images`
   - Check that the bucket was created successfully

2. **"Access denied" error**
   - Verify RLS policies are set up correctly
   - Check that the bucket is public
   - Ensure your environment variables are correct

3. **Images not displaying**
   - Check that the public URL is being generated correctly
   - Verify the image file exists in the bucket
   - Check browser console for CORS errors

### Environment Variables Check:

Make sure these are set in your `.env.local`:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

And in your server `.env`:
```
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Security Considerations

1. **File Size Limits**: Set appropriate limits to prevent abuse
2. **File Type Validation**: Only allow image files
3. **Authentication**: Consider requiring authentication for uploads
4. **Virus Scanning**: Consider implementing virus scanning for uploaded files
5. **CDN**: For production, consider using a CDN for better performance

## Performance Optimization

1. **Image Compression**: Consider compressing images before upload
2. **Multiple Sizes**: Generate different sizes for different use cases
3. **Lazy Loading**: Implement lazy loading for images in your frontend
4. **Caching**: Set appropriate cache headers for images 