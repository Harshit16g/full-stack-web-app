#!/bin/bash

# Reload the schema cache
echo "Reloading schema cache..."
psql "$POSTGRES_URL" -c "NOTIFY pgrst, 'reload schema';"

# Restart the dev server (optional, if running via pm2 or similar)
# echo "Restarting server..."
# pm2 restart project

echo "Done!"
