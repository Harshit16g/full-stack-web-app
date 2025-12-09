# API Documentation

## Server Actions

All server actions are located in `app/actions/` and should be called from client or server components.

### Contact Actions

#### submitContact
Submit a contact form request.

**File**: `app/actions/contact.ts`

**Parameters**:
\`\`\`typescript
{
  full_name: string;      // Min 2 characters
  email: string;          // Valid email format
  mobile: string;         // Min 10 digits
  city: string;           // Min 2 characters
}
\`\`\`

**Returns**: `{ success: true }`

**Usage**:
\`\`\`typescript
import { submitContact } from '@/app/actions/contact';

await submitContact({
  full_name: 'John Doe',
  email: 'john@example.com',
  mobile: '1234567890',
  city: 'New York'
});
\`\`\`

**Stores in**: `contact_requests` table

---

### Newsletter Actions

#### subscribeNewsletter
Subscribe email to newsletter.

**File**: `app/actions/newsletter.ts`

**Parameters**:
\`\`\`typescript
email: string  // Valid email address
\`\`\`

**Returns**: `{ success: true }`

**Usage**:
\`\`\`typescript
import { subscribeNewsletter } from '@/app/actions/newsletter';

await subscribeNewsletter('user@example.com');
\`\`\`

**Stores in**: `newsletter_subscribers` table

**Note**: Duplicate emails are rejected by database unique constraint

---

### Project Actions

#### addProject
Add a new project.

**File**: `app/actions/projects.ts`

**Parameters**:
\`\`\`typescript
{
  name: string;           // Project name
  description: string;    // Project description
  image_url: string;      // URL to project image
}
\`\`\`

**Returns**: Project object with all fields

**Usage**:
\`\`\`typescript
import { addProject } from '@/app/actions/projects';

const project = await addProject({
  name: 'Amazing Project',
  description: 'Description here',
  image_url: 'https://...'
});
\`\`\`

#### deleteProject
Delete a project by ID.

**File**: `app/actions/projects.ts`

**Parameters**:
\`\`\`typescript
id: string  // Project UUID
\`\`\`

**Returns**: `{ success: true }`

**Usage**:
\`\`\`typescript
import { deleteProject } from '@/app/actions/projects';

await deleteProject('uuid-here');
\`\`\`

---

### Client Actions

#### addClient
Add a new client/testimonial.

**File**: `app/actions/clients.ts`

**Parameters**:
\`\`\`typescript
{
  name: string;           // Client name
  description: string;    // Testimonial text
  designation: string;    // Job title
  image_url: string;      // URL to client image
}
\`\`\`

**Returns**: Client object with all fields

**Usage**:
\`\`\`typescript
import { addClient } from '@/app/actions/clients';

const client = await addClient({
  name: 'Jane Smith',
  description: 'Great service!',
  designation: 'CEO',
  image_url: 'https://...'
});
\`\`\`

#### deleteClient
Delete a client by ID.

**File**: `app/actions/clients.ts`

**Parameters**:
\`\`\`typescript
id: string  // Client UUID
\`\`\`

**Returns**: `{ success: true }`

**Usage**:
\`\`\`typescript
import { deleteClient } from '@/app/actions/clients';

await deleteClient('uuid-here');
\`\`\`

---

### Upload Actions

#### uploadImage
Upload and crop an image to Supabase Storage.

**File**: `app/actions/upload.ts`

**Parameters**:
\`\`\`typescript
formData: FormData  // Must contain 'file' field
\`\`\`

**Returns**: `string` - Public URL of uploaded image

**Usage**:
\`\`\`typescript
import { uploadImage } from '@/app/actions/upload';

const formData = new FormData();
formData.append('file', blobOrFile);

const url = await uploadImage(formData);
\`\`\`

**Image Processing**:
- Crops to 450×350 for projects
- Crops to 1:1 (square) for clients
- Stores as JPEG
- Returns public URL

---

## Database Queries (Client-Side)

### Fetch Projects
\`\`\`typescript
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();
const { data: projects } = await supabase
  .from('projects')
  .select('*')
  .order('created_at', { ascending: false });
\`\`\`

### Fetch Clients
\`\`\`typescript
const { data: clients } = await supabase
  .from('clients')
  .select('*')
  .order('created_at', { ascending: false });
\`\`\`

### Fetch Contact Requests
\`\`\`typescript
const { data: contacts } = await supabase
  .from('contact_requests')
  .select('*')
  .order('created_at', { ascending: false });
\`\`\`

### Fetch Newsletter Subscribers
\`\`\`typescript
const { data: subscribers } = await supabase
  .from('newsletter_subscribers')
  .select('*')
  .order('subscribed_at', { ascending: false });
\`\`\`

---

## Error Handling

All server actions throw errors on failure. Wrap in try-catch:

\`\`\`typescript
try {
  await submitContact(formData);
  // Success
} catch (error) {
  console.error('Error:', error);
  // Handle error - show toast notification
}
\`\`\`

---

## Rate Limiting

Currently not implemented. Consider adding for production:
1. Contact form - limit to 5 per hour per IP
2. Newsletter - limit to 1 per email per day
3. Image uploads - limit file size to 5MB

---

## CORS Configuration

Supabase handles CORS automatically. No additional configuration needed.

---

## Performance Notes

- All database queries are indexed
- Images are stored in CDN (Supabase Storage)
- Server actions are cached where appropriate
- Use SWR for client-side data fetching
