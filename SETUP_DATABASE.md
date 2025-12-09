# 🚀 Supabase Complete Setup Guide

## Quick Start (5 Minutes)

### Step 1: Run SQL Script

1. Go to your **Supabase Dashboard**: https://app.supabase.com
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy ALL content from `scripts/setup-db.sql`
6. Paste into the editor
7. Click **RUN** (or press Ctrl+Enter)

✅ You should see: "Success. No rows returned"

---

### Step 2: Create Storage Bucket

1. In Supabase Dashboard, go to **Storage**
2. Click **New Bucket**
3. Fill in:
   - **Name**: `projects`
   - **Public bucket**: ✅ **YES** (check this box)
   - **File size limit**: `5242880` (5MB)
   - **Allowed MIME types**: `image/jpeg,image/png,image/webp`
4. Click **Create Bucket**

---

### Step 3: Configure Storage Policies

1. Click on the `projects` bucket you just created
2. Click the **Policies** tab
3. Click **New Policy**

**Create 4 policies:**

#### Policy 1: Public Read (SELECT)
```
Policy name: Allow public to read images
Allowed operation: SELECT
Target roles: public
USING expression: true
```

#### Policy 2: Authenticated Upload (INSERT)
```
Policy name: Allow authenticated users to upload
Allowed operation: INSERT  
Target roles: authenticated
WITH CHECK expression: true
```

#### Policy 3: Authenticated Update (UPDATE)
```
Policy name: Allow authenticated users to update
Allowed operation: UPDATE
Target roles: authenticated
USING expression: true
WITH CHECK expression: true
```

#### Policy 4: Authenticated Delete (DELETE)
```
Policy name: Allow authenticated users to delete
Allowed operation: DELETE
Target roles: authenticated
USING expression: true
```

---

### Step 4: Create Admin User

1. In Supabase Dashboard, go to **Authentication**
2. Click **Users** tab
3. Click **Add User** button
4. Fill in:
   - **Email**: `admin@gmail.com`
   - **Password**: `admin@123`
   - **Auto Confirm User**: ✅ **YES** (check this)
5. Click **Create User**

---

### Step 5: Verify Setup

Run these checks in SQL Editor:

```sql
-- Check tables exist
SELECT COUNT(*) as table_count 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('projects', 'clients', 'contact_requests', 'newsletter_subscribers');
-- Should return: 4

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
-- All should show: rowsecurity = true

-- Check storage bucket exists
SELECT name FROM storage.buckets WHERE name = 'projects';
-- Should return: projects
```

---

## 🎯 What Was Created

### Database Tables

| Table | Purpose | Columns |
|-------|---------|---------|
| `projects` | Store portfolio projects | id, name, description, image_url, created_at, updated_at |
| `clients` | Store client testimonials | id, name, designation, description, image_url, created_at, updated_at |
| `contact_requests` | Store contact form submissions | id, full_name, email, mobile, city, created_at |
| `newsletter_subscribers` | Store newsletter emails | id, email, subscribed_at |

### RLS Policies

**Projects:**
- ✅ Public can read
- ✅ Authenticated can create/update/delete

**Clients:**
- ✅ Public can read
- ✅ Authenticated can create/update/delete

**Contact Requests:**
- ✅ Public can insert
- ✅ Authenticated can read

**Newsletter:**
- ✅ Public can insert
- ✅ Authenticated can read

### Indexes Created

- `idx_projects_created_at` - Fast sorting
- `idx_clients_created_at` - Fast sorting
- `idx_contact_requests_email` - Fast email lookups
- `idx_contact_requests_created_at` - Fast sorting
- `idx_newsletter_subscribers_email` - Fast email lookups
- `idx_newsletter_subscribers_subscribed_at` - Fast sorting

### Triggers

- Auto-update `updated_at` on projects when modified
- Auto-update `updated_at` on clients when modified

### Storage

- **Bucket**: `projects` (public, 5MB limit)
- **Policies**: Public read, authenticated write/update/delete

---

## 🧪 Test Your Setup

### Test 1: Database Connection
```bash
cd /home/h1/Downloads/full-stack-web-app
./dev.sh
```

Visit: http://localhost:3000

### Test 2: Admin Login
1. Go to: http://localhost:3000/auth/login
2. Login with:
   - Email: `admin@gmail.com`
   - Password: `admin@123`
3. Should redirect to: http://localhost:3000/admin

### Test 3: Add a Project
1. In admin panel, go to **Projects**
2. Click **Add Project**
3. Fill in:
   - Name: "Test Project"
   - Description: "This is a test"
   - Upload an image
4. Click **Add Project**
5. Should see success message

### Test 4: Theme Switching
1. Click sun/moon icon in navbar
2. Theme should switch smoothly
3. Refresh page - theme persists

---

## 🔧 Troubleshooting

### Error: "Bucket not found"
**Solution**: Create the `projects` bucket in Storage (Step 2)

### Error: "new row violates row-level security policy"
**Solution**: Make sure you're logged in with admin@gmail.com

### Error: "Permission denied for table"
**Solution**: Run the SQL script again (Step 1)

### Error: "Cannot read properties of null"
**Solution**: Verify environment variables in `.env` are correct

---

## 📊 Database Schema Diagram

```
┌─────────────────┐
│    projects     │
├─────────────────┤
│ id (PK)         │
│ name            │
│ description     │
│ image_url       │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐
│     clients     │
├─────────────────┤
│ id (PK)         │
│ name            │
│ designation     │
│ description     │
│ image_url       │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐
│ contact_requests│
├─────────────────┤
│ id (PK)         │
│ full_name       │
│ email           │
│ mobile          │
│ city            │
│ created_at      │
└─────────────────┘

┌─────────────────┐
│newsletter_subs  │
├─────────────────┤
│ id (PK)         │
│ email (UNIQUE)  │
│ subscribed_at   │
└─────────────────┘
```

---

## ✅ Setup Checklist

- [ ] Run SQL script in Supabase SQL Editor
- [ ] Create `projects` storage bucket
- [ ] Configure 4 storage policies
- [ ] Create admin user (admin@gmail.com)
- [ ] Verify tables exist (4 tables)
- [ ] Verify RLS is enabled
- [ ] Test login
- [ ] Test adding a project
- [ ] Test theme switching

Once all checked, you're ready to go! 🎉

---

## 🚀 Next Steps

1. ✅ **Setup Complete** - All database and storage ready
2. 🎨 **Customize** - Add your real projects and clients
3. 📧 **Email** - Configure email templates in Supabase
4. 🚢 **Deploy** - Push to Vercel with environment variables
5. 🌐 **Domain** - Connect your custom domain

**Your app is production-ready!** 🎊
