-- ============================================
-- COMPLETE SUPABASE SETUP SCRIPT
-- Full-Stack Portfolio Application
-- ============================================

-- ============================================
-- 1. DROP EXISTING POLICIES (if re-running)
-- ============================================
DROP POLICY IF EXISTS "Allow public read for projects" ON projects;
DROP POLICY IF EXISTS "Allow public read for clients" ON clients;
DROP POLICY IF EXISTS "Allow public insert for contact requests" ON contact_requests;
DROP POLICY IF EXISTS "Allow public insert for newsletter" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow authenticated insert for projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated update for projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated delete for projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated insert for clients" ON clients;
DROP POLICY IF EXISTS "Allow authenticated update for clients" ON clients;
DROP POLICY IF EXISTS "Allow authenticated delete for clients" ON clients;
DROP POLICY IF EXISTS "Allow authenticated read for contacts" ON contact_requests;
DROP POLICY IF EXISTS "Allow authenticated read for subscribers" ON newsletter_subscribers;

-- ============================================
-- 2. CREATE TABLES
-- ============================================

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Clients Table  
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  designation TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contact Requests Table
CREATE TABLE IF NOT EXISTS contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 3. CREATE INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_requests_email ON contact_requests(email);
CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at ON contact_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_subscribed_at ON newsletter_subscribers(subscribed_at DESC);

-- ============================================
-- 4. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. CREATE RLS POLICIES
-- ============================================

-- PROJECTS POLICIES --
-- Public can read all projects
CREATE POLICY "Allow public read for projects" 
  ON projects FOR SELECT 
  USING (true);

-- Authenticated users can insert projects
CREATE POLICY "Allow authenticated insert for projects" 
  ON projects FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update projects
CREATE POLICY "Allow authenticated update for projects" 
  ON projects FOR UPDATE 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete projects
CREATE POLICY "Allow authenticated delete for projects" 
  ON projects FOR DELETE 
  TO authenticated
  USING (true);

-- CLIENTS POLICIES --
-- Public can read all clients
CREATE POLICY "Allow public read for clients" 
  ON clients FOR SELECT 
  USING (true);

-- Authenticated users can insert clients
CREATE POLICY "Allow authenticated insert for clients" 
  ON clients FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update clients
CREATE POLICY "Allow authenticated update for clients" 
  ON clients FOR UPDATE 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete clients
CREATE POLICY "Allow authenticated delete for clients" 
  ON clients FOR DELETE 
  TO authenticated
  USING (true);

-- CONTACT REQUESTS POLICIES --
-- Public can insert contact requests
CREATE POLICY "Allow public insert for contact requests" 
  ON contact_requests FOR INSERT 
  WITH CHECK (true);

-- Authenticated users can read contact requests
CREATE POLICY "Allow authenticated read for contacts" 
  ON contact_requests FOR SELECT 
  TO authenticated
  USING (true);

-- NEWSLETTER SUBSCRIBERS POLICIES --
-- Public can insert newsletter subscriptions
CREATE POLICY "Allow public insert for newsletter" 
  ON newsletter_subscribers FOR INSERT 
  WITH CHECK (true);

-- Authenticated users can read subscribers
CREATE POLICY "Allow authenticated read for subscribers" 
  ON newsletter_subscribers FOR SELECT 
  TO authenticated
  USING (true);

-- ============================================
-- 6. CREATE UPDATE TIMESTAMP TRIGGER
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for projects table
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for clients table
DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 7. STORAGE BUCKETS SETUP
-- ============================================
-- NOTE: Storage buckets must be created via Supabase Dashboard
-- This section documents what needs to be created manually

-- BUCKET: "projects"
-- Purpose: Store project images
-- Public: Yes (allow public reading)
-- File size limit: 5MB
-- Allowed MIME types: image/jpeg, image/png, image/webp

-- Required Storage Policies for "projects" bucket:
-- 1. SELECT (Read): Allow public
-- 2. INSERT (Upload): Allow authenticated users
-- 3. UPDATE: Allow authenticated users  
-- 4. DELETE: Allow authenticated users

-- ============================================
-- 8. VERIFICATION QUERIES
-- ============================================

-- Verify tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('projects', 'clients', 'contact_requests', 'newsletter_subscribers');

-- Verify RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('projects', 'clients', 'contact_requests', 'newsletter_subscribers');

-- Verify policies exist
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('projects', 'clients', 'contact_requests', 'newsletter_subscribers')
ORDER BY tablename, policyname;

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Next steps:
-- 1. Create storage bucket "projects" in Supabase Dashboard
-- 2. Set bucket to public
-- 3. Configure storage policies (allow authenticated for INSERT/UPDATE/DELETE)
-- 4. Create admin user in Authentication section
-- 5. Test the application!
-- ============================================
