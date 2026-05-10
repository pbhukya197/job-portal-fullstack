# DEPLOYMENT.md - Deployment Instructions and Guides

## Deployment Guide

This document provides instructions for deploying the Job Portal UI application to various hosting platforms.

## Pre-Deployment Checklist

Before deploying to production:

- [ ] All tests pass
- [ ] Build completes without errors: `npm run build`
- [ ] No console errors or warnings
- [ ] Environment variables configured
- [ ] Backend API is stable and accessible
- [ ] HTTPS/SSL certificate is ready
- [ ] Domain name configured
- [ ] SEO metadata updated
- [ ] Analytics configured
- [ ] Error monitoring setup
- [ ] Backup plan in place

## Build Process

### Create Production Build

```bash
# Install dependencies (if not already done)
npm install

# Run linting to check for issues
npm run lint

# Create optimized production build
npm run build

# Output will be in dist/ directory
```

### Verify Build

```bash
# Preview the production build locally
npm run preview

# Open http://localhost:4173 in browser
# Test all functionality
# Check console for errors
```

## Environment Configuration

### Production Environment Variables

Create `.env.production.local` or configure via hosting platform:

```
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_STRIPE_PUBLIC_KEY=pk_live_your_stripe_key
VITE_ENABLE_PAYMENTS=true
```

**Important:** Never commit production secrets to git. Use platform-provided secret management.

### Environment Variables by Platform

#### Netlify
- Use Netlify dashboard
- Settings > Build & deploy > Environment

#### Vercel
- Use Vercel dashboard
- Settings > Environment Variables

#### GitHub Pages
- Use GitHub Secrets (for CI/CD)

#### Traditional Server
- Use `.env.production` file
- Or set OS environment variables

## Hosting Platform Guides

### Netlify (Recommended)

#### Prerequisites
- GitHub account
- Netlify account
- Domain (optional)

#### Deployment Steps

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Select GitHub
   - Authorize Netlify
   - Choose your repository

2. **Configure Build Settings**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18.x (or higher)

3. **Set Environment Variables**
   - Go to Site settings > Build & deploy
   - Add production environment variables
   - Restart deploy

4. **Deploy**
   - Netlify automatically builds on git push
   - Check Deployments tab for status
   - View live site

5. **Custom Domain (Optional)**
   - Domain settings > Custom domain
   - Add your domain
   - Update DNS records
   - Wait for SSL certificate

#### Netlify Configuration File

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, immutable, max-age=31536000"

[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=3600"
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
```

### Vercel (Recommended)

#### Prerequisites
- GitHub account
- Vercel account

#### Deployment Steps

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import GitHub repository
   - Authorize Vercel

2. **Configure Project**
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

3. **Set Environment Variables**
   - Project Settings > Environment Variables
   - Add production variables
   - Set to Production environment

4. **Deploy**
   - Vercel automatically deploys on git push
   - Monitor deployments
   - View live site

5. **Custom Domain (Optional)**
   - Settings > Domains
   - Add custom domain
   - Update DNS records

#### Vercel Configuration

Create `vercel.json` in project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_BASE_URL": "@api_base_url"
  },
  "routes": [
    {
      "src": "^/(?!.*\\.(js|css|png|jpg|jpeg|svg|gif|ico|woff|woff2)$)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### GitHub Pages

#### Prerequisites
- GitHub account
- Repository with Push access

#### Deployment Steps

1. **Setup Repository**
   - Go to repository Settings
   - Pages section
   - Source > Deploy from a branch
   - Select branch and folder

2. **Configure Deployment**
   - Create `.github/workflows/deploy.yml`
   - Set up GitHub Actions for build and deploy

3. **GitHub Actions Workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

4. **Configure Base URL**

Update `vite.config.js` for subdirectory deployment:

```javascript
export default defineConfig({
  base: '/job-portal-ui/',  // If deploying to subdirectory
  // ... rest of config
})
```

### AWS (Amplify, S3 + CloudFront)

#### Using AWS Amplify

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect GitHub repository
   - Authorize AWS

2. **Configure Build**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

3. **Set Environment Variables**
   - Environment variables section
   - Add production variables

4. **Deploy**
   - Amplify automatically builds and deploys
   - Custom domain setup available

#### Using S3 + CloudFront

1. **Create S3 Bucket**
   - Create bucket for `yourdomain.com`
   - Enable static website hosting
   - Configure bucket policy for public access

2. **Upload Build Files**
   ```bash
   aws s3 sync dist/ s3://yourdomain.com --delete
   ```

3. **Setup CloudFront**
   - Create CloudFront distribution
   - Set S3 bucket as origin
   - Configure caching
   - Add SSL certificate
   - Point domain to CloudFront

### Traditional Server (Nginx, Apache)

#### Nginx Configuration

Create `/etc/nginx/sites-available/jobportal`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    # SSL certificates
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Root directory
    root /var/www/jobportal/dist;
    index index.html;
    
    # Compression
    gzip on;
    gzip_types text/plain text/css text/javascript application/javascript;
    
    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API proxy (optional)
    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
```

#### Deployment via FTP/SFTP

```bash
# Build project
npm run build

# Upload dist/ folder to server
# Using SFTP, FTP, or rsync
scp -r dist/* user@server.com:/var/www/jobportal/
```

## Post-Deployment

### Verification Checklist

- [ ] Site loads without errors
- [ ] API calls work correctly
- [ ] Authentication functions
- [ ] Responsive design works
- [ ] Dark mode works
- [ ] All pages load
- [ ] Forms submit correctly
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] Security headers present

### Performance Testing

```bash
# Check performance metrics
# Use Lighthouse in Chrome DevTools
# Target scores: 90+
```

### Monitoring

#### Sentry (Error Tracking)
```javascript
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV,
})
```

#### Google Analytics
Add tracking code to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || []
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date())
  gtag('config', 'GA_ID')
</script>
```

### Maintenance

#### Regular Updates
- Check for security updates: `npm audit`
- Update dependencies: `npm update`
- Test after updates
- Monitor error logs

#### Backups
- Backup database regularly
- Backup configuration files
- Test restore procedures

## Continuous Integration/Deployment

### GitHub Actions Example

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint code
        run: npm run lint
      
      - name: Build
        run: npm run build
      
      - name: Deploy (if main branch)
        if: github.ref == 'refs/heads/main'
        run: npm run deploy
        env:
          DEPLOYMENT_KEY: ${{ secrets.DEPLOYMENT_KEY }}
```

## Rollback Procedures

### Rollback Steps

1. **Identify Issue**
   - Monitor error logs
   - Check user reports

2. **Rollback Process**
   - Netlify/Vercel: Select previous deployment
   - GitHub Pages: Revert git commit and push
   - S3: Upload previous build
   - Traditional Server: Restore from backup

3. **Verify**
   - Test functionality
   - Monitor logs
   - Confirm issue resolved

## Security in Production

### Security Headers

Configure these headers in web server:

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

### HTTPS/SSL

- Use SSL certificate
- Force HTTPS redirect
- Enable HSTS
- Update SSL regularly

### Environment Security

- Don't commit secrets
- Use environment variables
- Rotate credentials regularly
- Use secure API keys

## Troubleshooting

### Build Fails on Hosting

**Solution:**
1. Check Node version matches
2. Verify npm dependencies install
3. Check build logs for errors
4. Test build locally

### Site Shows Blank

**Solution:**
1. Check base URL in vite.config.js
2. Verify dist folder uploaded
3. Check browser console errors
4. Verify index.html exists

### API Calls Fail

**Solution:**
1. Verify VITE_API_BASE_URL set correctly
2. Check CORS configuration on backend
3. Verify backend is accessible
4. Check network tab in DevTools

### Slow Performance

**Solution:**
1. Enable gzip compression
2. Configure caching properly
3. Optimize images
4. Check bundle size
5. Use CDN for static assets

## Performance Optimization

### Before Deployment

```bash
# Analyze bundle size
npm run build -- --visualizer

# Check performance
npm run preview
# Use Lighthouse in DevTools
```

### Compression

Enable gzip on web server:

**Nginx:**
```nginx
gzip on;
gzip_types text/plain text/css text/javascript application/javascript image/svg+xml;
gzip_min_length 1000;
```

**Apache:**
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

### Caching Strategy

```
- Static assets (JS, CSS): 1 year cache
- Index.html: No cache (always fresh)
- Images: 1 month cache
- API responses: No cache
```

## Disaster Recovery

### Backup Strategy

- Backup database daily
- Backup configuration weekly
- Store backups in multiple locations
- Test restore procedures monthly

### Disaster Recovery Plan

1. **Identify Problem**
   - Monitor alerts
   - Check error logs

2. **Assess Impact**
   - Determine scope
   - Estimate recovery time

3. **Execute Recovery**
   - Restore from backup
   - Verify data integrity
   - Test functionality

4. **Post-Incident**
   - Document what happened
   - Identify improvements
   - Update procedures

## Resources

- [Netlify Documentation](https://docs.netlify.com)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Pages Guide](https://pages.github.com)
- [AWS Amplify Docs](https://docs.amplify.aws)
- [Nginx Documentation](https://nginx.org/en/docs/)

---

**Last Updated:** May 2026

For related topics:
- [INSTALLATION.md](INSTALLATION.md) - Local setup
- [DEVELOPMENT.md](DEVELOPMENT.md) - Development guidelines
- [DOCUMENTATION.md](DOCUMENTATION.md) - Technical details
