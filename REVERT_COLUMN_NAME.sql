-- Rename the column back to 'message'
ALTER TABLE contact_requests RENAME COLUMN user_message TO message;

-- If 'message' already exists (e.g. from previous attempts), ensure we are clean
-- DO $$
-- BEGIN
--     IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_requests' AND column_name = 'user_message') THEN
--         ALTER TABLE contact_requests DROP COLUMN user_message;
--     END IF;
-- END $$;
