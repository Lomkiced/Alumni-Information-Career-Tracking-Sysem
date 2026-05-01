-- Fix infinite recursion in profiles table policies

-- 1. Drop the recursive policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- 2. Create a security definer function to check if a user is an admin
--    This bypasses RLS on the profiles table so we avoid recursion.
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
DECLARE
  _role TEXT;
BEGIN
  -- Bypass RLS
  SELECT role INTO _role FROM profiles WHERE id = auth.uid();
  RETURN _role = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Recreate the policy using the non-recursive function
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  is_admin()
);
