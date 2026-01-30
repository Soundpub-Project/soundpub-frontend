-- Create storage bucket for service covers
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'service-covers', 
  'service-covers', 
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Policy: Anyone can view service covers (public bucket)
CREATE POLICY "Public can view service covers"
ON storage.objects FOR SELECT
USING (bucket_id = 'service-covers');

-- Policy: Admins can upload service covers
CREATE POLICY "Admins can upload service covers"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'service-covers' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Policy: Admins can update service covers
CREATE POLICY "Admins can update service covers"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'service-covers' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Policy: Admins can delete service covers
CREATE POLICY "Admins can delete service covers"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'service-covers' 
  AND has_role(auth.uid(), 'admin'::app_role)
);