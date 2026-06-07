-- Enable RLS on the comments table
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view comments" ON public.comments;
DROP POLICY IF EXISTS "Authenticated users can post comments" ON public.comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON public.comments;
DROP POLICY IF EXISTS "Users can delete their own comments" ON public.comments;

-- 1. SELECT: Anyone can read comments
CREATE POLICY "Anyone can view comments" 
ON public.comments FOR SELECT 
USING (true);

-- 2. INSERT: Authenticated users can insert comments and must set user_id to themselves
CREATE POLICY "Authenticated users can post comments" 
ON public.comments FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- 3. UPDATE: Users can update their own comments
CREATE POLICY "Users can update their own comments" 
ON public.comments FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

-- 4. DELETE: Users can delete their own comments
CREATE POLICY "Users can delete their own comments" 
ON public.comments FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);
