-- Rename the column to bypass the schema cache issue
ALTER TABLE contact_requests RENAME COLUMN message TO user_message;

-- If the column doesn't exist yet (e.g. previous alter failed), create it:
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_requests' AND column_name = 'user_message') THEN
        ALTER TABLE contact_requests ADD COLUMN user_message TEXT;
    END IF;
END $$;
