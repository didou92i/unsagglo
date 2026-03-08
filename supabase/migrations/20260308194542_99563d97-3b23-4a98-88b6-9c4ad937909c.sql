-- Allow admins to INSERT articles
CREATE POLICY "Admins can insert articles"
ON public.articles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow admins to DELETE articles
CREATE POLICY "Admins can delete articles"
ON public.articles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for storage.objects on documents bucket
CREATE POLICY "Admins can upload documents"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents' AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete documents"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents' AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Public read documents"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'documents');