-- Add missing columns to existing profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'super_admin')),
ADD COLUMN IF NOT EXISTS approval_status TEXT NOT NULL DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected'));

-- Drop existing policies first
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Create new RLS policies
CREATE POLICY "users_read_own_profile" ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "super_admins_read_all" ON profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() 
      AND role = 'super_admin'
      AND approval_status = 'approved'
    )
  );

CREATE POLICY "super_admins_update_all" ON profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() 
      AND role = 'super_admin'
      AND approval_status = 'approved'
    )
  );

CREATE POLICY "users_insert_own" ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_email TEXT;
  user_role TEXT;
  user_approval TEXT;
BEGIN
  user_email := NEW.email;
  
  -- Auto-approve super admins
  IF user_email IN ('coach.janto@gmail.com', 'jantodj@gmail.com') THEN
    user_role := 'super_admin';
    user_approval := 'approved';
  ELSE
    user_role := 'user';
    user_approval := 'pending';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, avatar_url, role, approval_status)
  VALUES (
    NEW.id,
    user_email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    user_role,
    user_approval
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    role = EXCLUDED.role,
    approval_status = EXCLUDED.approval_status,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update existing profiles: set super admins
UPDATE profiles 
SET 
  role = 'super_admin',
  approval_status = 'approved',
  updated_at = NOW()
WHERE email IN ('coach.janto@gmail.com', 'jantodj@gmail.com');