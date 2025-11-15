# 🚀 Deploy Green Ledger to Production - Step by Step

## ✅ Step 1: Code is Ready!
Your code has been committed and is ready to push.

## 📤 Step 2: Create GitHub Repository

### Option A: Using GitHub Website (Easiest)

1. **Go to**: https://github.com/new
2. **Repository name**: `green-ledger` (or any name you prefer)
3. **Description**: "CSRD/ESRS Reporting Platform"
4. **Visibility**: Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. **Click**: "Create repository"

### Option B: Using GitHub CLI (if installed)

```bash
gh repo create green-ledger --public --source=. --remote=origin --push
```

## 🔗 Step 3: Connect and Push

After creating the repo, GitHub will show you commands. Run these:

```bash
cd "/Users/vinayaklahiri/MVP_1/MVP2 - GreenLedger"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/green-ledger.git

# Push the code
git branch -M main
git push -u origin main
```

**Replace `YOUR-USERNAME` with your GitHub username!**

## 🗄️ Step 4: Get a Production Database

Choose one (all have free tiers):

### Option A: Supabase (Recommended)
1. Go to https://supabase.com
2. Sign up → Create Project
3. Wait 2 minutes for setup
4. Go to: Settings → Database
5. Copy the connection string (URI format)
   - Format: `postgresql://postgres.xxxxx:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres`

### Option B: Neon
1. Go to https://neon.tech
2. Sign up → Create Project
3. Copy the connection string shown

### Option C: Vercel Postgres (If using Vercel)
1. In Vercel dashboard → Storage → Create → Postgres
2. Copy connection string

## ☁️ Step 5: Deploy to Vercel

1. **Go to**: https://vercel.com/new
2. **Sign in** with GitHub (if not already)
3. **Click**: "Import Git Repository"
4. **Select**: `green-ledger` (or your repo name)
5. **Configure Project**:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `prisma generate && next build` (auto-set)
   - Output Directory: `.next` (auto-set)
6. **Environment Variables**:
   - Click "Environment Variables"
   - Add:
     - **Name**: `DATABASE_URL`
     - **Value**: Your database connection string from Step 4
     - **Environment**: Production, Preview, Development (check all)
7. **Click**: "Deploy"

## 🗄️ Step 6: Run Database Migrations

After deployment completes:

1. **Get Production DATABASE_URL**:
   - Go to Vercel dashboard → Your project → Settings → Environment Variables
   - Copy the `DATABASE_URL` value

2. **Run migrations locally** (one-time):
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

## ✅ Step 7: Your App is Live!

- **Production URL**: `https://your-project-name.vercel.app`
- **Share with team**: Anyone can access it!
- **Update code**: Just push to GitHub, Vercel auto-deploys

## 🎯 Quick Commands Summary

```bash
# 1. Push to GitHub (after creating repo)
git remote add origin https://github.com/YOUR-USERNAME/green-ledger.git
git push -u origin main

# 2. After Vercel deployment, run migrations
DATABASE_URL="your-production-url" npx prisma migrate deploy
```

## 🆘 Troubleshooting

**"Repository not found"**
- Check your GitHub username is correct
- Make sure you created the repo on GitHub first

**"Deployment failed"**
- Check DATABASE_URL is set in Vercel environment variables
- Check build logs in Vercel dashboard

**"Database connection failed"**
- Verify DATABASE_URL is correct
- Check database allows connections from Vercel IPs
- For Supabase: Check connection pooling settings

## 🎉 Success!

Once deployed, you can:
- ✅ Access from anywhere: `https://your-project.vercel.app`
- ✅ Share with your team
- ✅ Upload ESG data
- ✅ Generate CSRD reports
- ✅ Export to HTML, PDF, XBRL

---

**Next**: Follow the steps above, and your Green Ledger will be live in ~10 minutes!

