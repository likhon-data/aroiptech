-- Create waitlist table
CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public signup form)
CREATE POLICY "Anyone can join the waitlist"
  ON public.waitlist
  FOR INSERT
  WITH CHECK (true);

-- No public reads (admin only)
CREATE POLICY "No public reads"
  ON public.waitlist
  FOR SELECT
  USING (false);