-- ============================================
-- STORAGE BUCKET POLICIES FIX
-- Run this in Supabase SQL Editor
-- ============================================

-- First, let's make sure the bucket exists and is public
-- (This part may already be done via dashboard, but doesn't hurt to verify)

-- Drop existing storage policies to start fresh
DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

-- ============================================
-- CREATE STORAGE POLICIES FOR "projects" BUCKET
-- ============================================

-- Policy 1: Anyone can SELECT (view/download) images
CREATE POLICY "Public can view images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'projects');

-- Policy 2: Authenticated users can INSERT (upload) images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'projects');

-- Policy 3: Authenticated users can UPDATE images
CREATE POLICY "Authenticated users can update images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'projects')
WITH CHECK (bucket_id = 'projects');

-- Policy 4: Authenticated users can DELETE images
CREATE POLICY "Authenticated users can delete images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'projects');

-- ============================================
-- VERIFICATION
-- ============================================

-- Check that policies were created
SELECT 
    policyname,
    cmd,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
ORDER BY policyname;

-- Should show 4 policies:
-- 1. Authenticated users can delete images (DELETE, {authenticated})
-- 2. Authenticated users can update images (UPDATE, {authenticated})
-- 3. Authenticated users can upload images (INSERT, {authenticated})
-- 4. Public can view images (SELECT, {public})

-- ============================================
-- DONE!
-- ============================================
-- Now try uploading an image from the admin panel
-- It should work!
