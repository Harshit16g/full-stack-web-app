# 🔍 Debugging: Project Not Showing Up

## Issue
Project was created successfully (got success message) but not showing on admin dashboard or landing page.

## ✅ Fixes Applied

1. **Added Refresh Button** - Click the refresh icon (🔄) next to "Add Project" button
2. **Improved Page Navigation** - After adding project, page navigates to refresh data
3. **Better Error Handling** - More informative error messages

## 🧪 How to Test

### Test 1: Check if Data is in Database

1. Go to **Supabase Dashboard**
2. Click **Table Editor**
3. Select `projects` table
4. Look for your project "p1"

**If you see it**: Data is saved ✅  
**If you don't see it**: There's an insert problem ❌

### Test 2: Manual Refresh

1. Go to `/admin/projects`
2. Click the **refresh icon** (🔄) next to "Add Project"
3. Page should reload and show all projects

### Test 3: Force Browser Refresh

1. Press `Ctrl + Shift + R` (hard refresh)
2. Or `Cmd + Shift + R` on Mac
3. This clears cache and reloads

### Test 4: Check Browser Console

1. Press `F12` to open DevTools
2. Go to **Console** tab
3. Look for any red errors
4. Check **Network** tab for failed requests

## 🐛 Common Causes

### 1. Browser Caching
**Symptom**: Old data showing  
**Fix**: Hard refresh with `Ctrl + Shift + R`

### 2. RLS Policy Blocking Read
**Symptom**: Data in database but not showing  
**Fix**: Check Supabase policies allow SELECT

### 3. Failed Insert (Silent Failure)
**Symptom**: Success message but no data  
**Fix**: Check browser console for errors

### 4. Wrong Table Name
**Symptom**: Query returns empty  
**Fix**: Verify table is named `projects` not `project`

## 📝 Quick SQL Check

Run this in Supabase SQL Editor:

```sql
-- Check if project exists
SELECT * FROM projects ORDER BY created_at DESC LIMIT 5;

-- Count total projects
SELECT COUNT(*) as total FROM projects;

-- Check RLS policies
SELECT tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'projects';
```

## ✅ Current Status

After the fixes:
- ✅ Refresh button added to admin projects page
- ✅ Better navigation after adding project
- ✅ Improved error handling

## 🎯 Next Steps

1. **Click the refresh button** (🔄) on the admin projects page
2. **Check Supabase Table Editor** to verify data exists
3. **Hard refresh browser** with Ctrl+Shift+R
4. **Check console** for any JavaScript errors

If the project appears in Supabase but not in the UI after all these steps, let me know and we'll investigate further!

## 🔧 Manual Verification

### Check if project "p1" is in database:

**SQL Query:**
```sql
SELECT name, description, image_url, created_at 
FROM projects 
WHERE name = 'p1';
```

**Expected Result:**
- name: "p1"
- description: "test project"
- image_url: (url from Supabase storage)
- created_at: (timestamp)

If you see this data, the issue is with the frontend refresh, not the database save.
