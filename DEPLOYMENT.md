# Deployment Guide

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database schema initialized in Supabase
- [ ] Supabase Storage bucket created
- [ ] RLS policies enabled
- [ ] All images are properly optimized
- [ ] Code tested locally
- [ ] No console errors or warnings
- [ ] Performance metrics acceptable

## Vercel Deployment (Recommended)

### Step 1: Prepare Git Repository
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git push -u origin main
\`\`\`

### Step 2: Connect to Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select your repository
4. Framework: Next.js
5. Build settings should auto-detect

### Step 3: Environment Variables
1. In Vercel Project Settings → Environment Variables
2. Add each variable for Production:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `POSTGRES_URL`

### Step 4: Deploy
Click "Deploy" and wait for build to complete (usually 2-3 minutes)

## Post-Deployment

### Verify Deployment
- [ ] Landing page loads correctly
- [ ] All sections display properly
- [ ] Images load from Supabase
- [ ] Contact form submits data
- [ ] Newsletter subscription works
- [ ] Admin panel is accessible
- [ ] Database queries work
- [ ] No CORS errors

### Monitor Performance
- Check Vercel Analytics
- Monitor database query performance
- Track storage usage in Supabase
- Set up error alerts

## Rollback

If issues occur after deployment:

1. **Revert deployment:**
   - Go to Vercel dashboard
   - Select previous deployment
   - Click "Redeploy"

2. **Database issues:**
   - Check Supabase logs
   - Verify RLS policies
   - Restore from backup if needed

## Troubleshooting

### Common Issues

**Pages not loading:**
- Check environment variables
- Verify database connection
- Check Vercel logs
- Ensure Supabase is accessible

**Images not displaying:**
- Verify Supabase Storage bucket exists
- Check storage bucket permissions
- Verify image URLs in database
- Check CORS settings

**Database errors:**
- Verify connection string
- Check RLS policies
- Ensure tables exist
- Review Supabase error logs

**Admin panel not working:**
- Verify all server actions are deployed
- Check API routes
- Review console errors
- Check database permissions

### Debug Mode
Enable debug mode in logs:
\`\`\`bash
# In Vercel dashboard
# Settings → Runtime logs → Enable
\`\`\`

## Performance Optimization

### Database
- Enable query caching where possible
- Index frequently queried columns
- Monitor connection pool usage

### Images
- Compress before upload
- Use modern formats (WebP)
- Set up CDN caching
- Monitor storage costs

### Frontend
- Enable Static Generation where possible
- Use ISR (Incremental Static Regeneration)
- Minimize CSS/JS bundles
- Lazy load images

## Security Checklist

- [ ] HTTPS enabled (Vercel auto-enables)
- [ ] Environment variables not in code
- [ ] RLS policies configured
- [ ] API endpoints protected
- [ ] Input validation on forms
- [ ] CSRF protection enabled
- [ ] SQL injection prevention (using parameterized queries)
- [ ] Rate limiting on contact form

## Monitoring

### Set up Alerts for:
- Deployment failures
- Build time exceeding threshold
- High error rates
- Database connection failures
- Storage quota near limit

### Regular Maintenance:
- Review logs weekly
- Monitor performance metrics
- Clean up old images/data
- Update dependencies monthly
- Review security settings quarterly
