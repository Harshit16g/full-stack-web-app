-- Run this command in your Supabase SQL Editor to reload the schema cache
-- This fixes the "Could not find the 'message' column" error

NOTIFY pgrst, 'reload schema';
