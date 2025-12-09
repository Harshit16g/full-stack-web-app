-- Run this to check if the 'message' column actually exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'contact_requests';

-- You should see 'message' in the list.
-- If NOT, run this command:
-- ALTER TABLE contact_requests ADD COLUMN message TEXT;
