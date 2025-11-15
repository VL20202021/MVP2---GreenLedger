# Green Ledger Deployment Guide

## Quick Setup & Deployment

### Option 1: Deploy to Vercel (Recommended - Easiest)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Set up Database**:
   - Use Vercel Postgres (recommended) or any PostgreSQL provider
   - For Vercel Postgres: Go to your Vercel dashboard → Storage → Create Database → Postgres
   - Copy the connection string

4. **Deploy**:
   ```bash
   cd "/Users/vinayaklahiri/MVP_1/MVP2 - GreenLedger"
   vercel
   ```
   - Follow the prompts
   - When asked for environment variables, add:
     - `DATABASE_URL` = your PostgreSQL connection string

5. **Run Migrations**:
   ```bash
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

6. **Your app will be live at**: `https://your-project.vercel.app`

### Option 2: Deploy to Railway

1. **Install Railway CLI**:
   ```bash
   npm i -g @railway/cli
   ```

2. **Login and Initialize**:
   ```bash
   railway login
   railway init
   ```

3. **Add PostgreSQL Service**:
   - In Railway dashboard, add a PostgreSQL service
   - Copy the `DATABASE_URL` from the service variables

4. **Set Environment Variable**:
   ```bash
   railway variables set DATABASE_URL="your-postgres-url"
   ```

5. **Deploy**:
   ```bash
   railway up
   ```

6. **Run Migrations**:
   ```bash
   railway run npx prisma migrate deploy
   ```

### Option 3: Local Development Setup

1. **Install PostgreSQL locally** (if not installed):
   ```bash
   # macOS
   brew install postgresql@14
   brew services start postgresql@14
   
   # Create database
   createdb green_ledger
   ```

2. **Create .env file**:
   ```bash
   cd "/Users/vinayaklahiri/MVP_1/MVP2 - GreenLedger"
   echo 'DATABASE_URL="postgresql://localhost:5432/green_ledger?schema=public"' > .env
   ```

3. **Run Migrations**:
   ```bash
   npx prisma migrate dev
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

5. **Access at**: http://localhost:3000

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string

Optional:
- `NEXT_PUBLIC_APP_NAME` - App name (defaults to "Green Ledger")

## Database Setup

### Using Vercel Postgres (Free Tier Available)
1. Go to https://vercel.com/dashboard
2. Select your project → Storage → Create → Postgres
3. Copy the connection string
4. Add as `DATABASE_URL` environment variable

### Using Supabase (Free Tier Available)
1. Go to https://supabase.com
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string (use "Connection string" → "URI")
5. Add as `DATABASE_URL` environment variable

### Using Neon (Free Tier Available)
1. Go to https://neon.tech
2. Create a new project
3. Copy the connection string
4. Add as `DATABASE_URL` environment variable

## Post-Deployment Checklist

- [ ] Database migrations completed
- [ ] Environment variables set
- [ ] Test file upload at `/upload`
- [ ] Test mappings at `/mappings`
- [ ] Test report generation at `/reports`
- [ ] Verify exports (HTML, PDF, XBRL) work

## Troubleshooting

### Puppeteer Issues (PDF Generation)
If PDF export fails in production, you may need to:
- Use a different PDF library (e.g., `@react-pdf/renderer`)
- Or configure Puppeteer for serverless environments

### Database Connection Issues
- Verify `DATABASE_URL` is correctly set
- Check if database allows connections from your deployment platform
- For Vercel, ensure you're using the correct connection string format

