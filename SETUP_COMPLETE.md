# ✅ Green Ledger Setup Complete!

Your Green Ledger application is ready to deploy! Here's what's been set up:

## ✅ What's Done

- ✅ All dependencies installed
- ✅ Prisma client generated
- ✅ TypeScript compilation successful
- ✅ Deployment configuration files created
- ✅ Setup scripts ready

## 🚀 Next Steps to Deploy

### Step 1: Get a Database (Choose One)

**Option A: Supabase (Recommended - Free & Easy)**
1. Go to https://supabase.com
2. Sign up/login → Create New Project
3. Wait for project to initialize
4. Go to Settings → Database
5. Copy the "Connection string" (URI format)
   - Format: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

**Option B: Vercel Postgres** (If deploying to Vercel)
1. Go to https://vercel.com/dashboard
2. Storage → Create → Postgres
3. Copy the connection string

**Option C: Neon** (Also great)
1. Go to https://neon.tech
2. Create account → New Project
3. Copy the connection string

### Step 2: Configure Environment

Create a `.env` file in the project root:

```bash
cd "/Users/vinayaklahiri/MVP_1/MVP2 - GreenLedger"
cat > .env << 'EOF'
DATABASE_URL="your-connection-string-here"
NEXT_PUBLIC_APP_NAME="Green Ledger"
EOF
```

Replace `your-connection-string-here` with the connection string from Step 1.

### Step 3: Run Database Migrations

```bash
npx prisma migrate dev --name init
```

This will:
- Create all database tables
- Set up the schema

### Step 4: Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 🎉

---

## 🌐 Deploy to Production

### Deploy to Vercel (Easiest)

1. **Push to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Green Ledger"
   # Create a repo on GitHub and push
   git remote add origin https://github.com/yourusername/green-ledger.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Add environment variable:
     - Name: `DATABASE_URL`
     - Value: Your database connection string
   - Click Deploy!

3. **Run Production Migrations**:
   ```bash
   # Get production DATABASE_URL from Vercel dashboard
   DATABASE_URL="your-production-url" npx prisma migrate deploy
   ```

Your app will be live at: `https://your-project.vercel.app`

### Alternative: Deploy to Railway

1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Add PostgreSQL service in Railway dashboard
5. Set `DATABASE_URL` environment variable
6. Deploy: `railway up`
7. Run migrations: `railway run npx prisma migrate deploy`

---

## 📋 Quick Test Checklist

Once running, test these:

- [ ] Upload a CSV file at `/upload`
- [ ] Map fields to ESRS at `/mappings`
- [ ] Generate report at `/reports`
- [ ] Export to HTML, PDF, XBRL
- [ ] View KPIs on dashboard `/`

---

## 📚 Documentation

- `QUICKSTART.md` - Quick setup guide
- `DEPLOYMENT.md` - Detailed deployment options
- `README.md` - Full documentation

---

## 🆘 Troubleshooting

**"DATABASE_URL not found"**
- Make sure `.env` file exists in project root
- Check the connection string is correct

**"Migration failed"**
- Ensure database is accessible
- Check firewall/network settings for cloud databases

**"Port 3000 in use"**
- Use different port: `PORT=3001 npm run dev`

**Build succeeds but runtime errors**
- This is normal if DATABASE_URL isn't set
- Set up database and run migrations first

---

## 🎉 You're All Set!

Your Green Ledger application is ready. Just:
1. Get a database connection string
2. Add it to `.env`
3. Run migrations
4. Start the server!

For questions, check the documentation files or the README.

