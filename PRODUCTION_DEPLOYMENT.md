# 🚀 Production Deployment - Complete Guide

## ✅ Current Status

- ✅ Git repository initialized
- ✅ All code committed
- ✅ Ready to push to GitHub
- ✅ Deployment configs ready

## 📤 Step 1: Create GitHub Repository

### Quick Method:

1. **Go to**: https://github.com/new
2. **Repository name**: `green-ledger` (or your choice)
3. **Description**: "CSRD/ESRS Reporting Platform"
4. **Visibility**: Public or Private
5. **Important**: DO NOT check "Initialize with README" or add .gitignore
6. **Click**: "Create repository"

### Or Use the Helper Script:

```bash
cd "/Users/vinayaklahiri/MVP_1/MVP2 - GreenLedger"
./deploy.sh
```

This will guide you through the entire process!

## 🔗 Step 2: Push to GitHub

After creating the repository, run:

```bash
cd "/Users/vinayaklahiri/MVP_1/MVP2 - GreenLedger"

# Add your GitHub repository (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git

# Push the code
git branch -M main
git push -u origin main
```

**Example**:
```bash
git remote add origin https://github.com/johndoe/green-ledger.git
git push -u origin main
```

## 🗄️ Step 3: Get Production Database

Choose one (all free):

### Option A: Supabase (Recommended)
1. Go to https://supabase.com
2. Sign up → Create Project
3. Wait 2 minutes
4. Settings → Database → Copy connection string (URI)
5. Format: `postgresql://postgres.xxxxx:[PASSWORD]@host:6543/postgres`

### Option B: Neon
1. Go to https://neon.tech
2. Sign up → Create Project
3. Copy connection string

### Option C: Vercel Postgres
1. In Vercel dashboard → Storage → Create → Postgres
2. Copy connection string

## ☁️ Step 4: Deploy to Vercel

1. **Go to**: https://vercel.com/new
2. **Sign in** with GitHub
3. **Import** your `green-ledger` repository
4. **Configure Project**:
   - Framework: Next.js (auto-detected) ✅
   - Root Directory: `./` ✅
   - Build Command: `prisma generate && next build` ✅
   - Output Directory: `.next` ✅
5. **Environment Variables**:
   - Click "Environment Variables"
   - Add new variable:
     - **Name**: `DATABASE_URL`
     - **Value**: Your database connection string
     - **Environments**: ☑ Production ☑ Preview ☑ Development
   - Click "Save"
6. **Click**: "Deploy"

**Deployment takes 2-3 minutes**

## 🗄️ Step 5: Run Database Migrations

After deployment:

1. **Get Production DATABASE_URL**:
   - Vercel Dashboard → Your Project → Settings → Environment Variables
   - Copy the `DATABASE_URL` value

2. **Run migrations** (one-time):
   ```bash
   DATABASE_URL="your-production-database-url" npx prisma migrate deploy
   ```

   Or use Vercel CLI:
   ```bash
   npm i -g vercel
   vercel login
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

## ✅ Step 6: Your App is Live!

- **URL**: `https://your-project-name.vercel.app`
- **Share**: Anyone with the URL can access it
- **Updates**: Push to GitHub → Auto-deploys

## 🎯 Quick Commands Reference

```bash
# 1. Push to GitHub (after creating repo)
git remote add origin https://github.com/YOUR-USERNAME/green-ledger.git
git push -u origin main

# 2. After Vercel deployment, run migrations
DATABASE_URL="your-production-url" npx prisma migrate deploy
```

## 🧪 Test Your Deployment

1. **Visit**: Your Vercel URL
2. **Upload**: Go to `/upload` → Upload a CSV file
3. **Map**: Go to `/mappings` → Map fields to ESRS
4. **Report**: Go to `/reports` → Generate and export report
5. **Dashboard**: Go to `/` → View KPIs

## 🔄 Future Updates

To update your deployed app:
```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main

# Vercel automatically deploys!
```

## 🆘 Troubleshooting

### "Repository not found"
- Verify repository exists on GitHub
- Check your GitHub username is correct
- Ensure you have push access

### "Deployment failed"
- Check `DATABASE_URL` is set in Vercel
- Check build logs in Vercel dashboard
- Verify database connection string is correct

### "Database connection failed"
- Verify `DATABASE_URL` in Vercel environment variables
- Check database allows external connections
- For Supabase: Use connection pooling URL

### "Migrations failed"
- Ensure `DATABASE_URL` is correct
- Check database is accessible
- Verify Prisma schema is correct

## 📊 Deployment Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Database created (Supabase/Neon/Vercel)
- [ ] Vercel project created
- [ ] `DATABASE_URL` environment variable set
- [ ] Deployment successful
- [ ] Migrations run
- [ ] App accessible at Vercel URL
- [ ] Test upload functionality
- [ ] Test mappings functionality
- [ ] Test report generation
- [ ] Test exports (HTML, PDF, XBRL)

## 🎉 Success!

Your Green Ledger is now live in production! Share the URL with your team.

---

**Need help?** Check `DEPLOY_NOW.md` for step-by-step instructions.

