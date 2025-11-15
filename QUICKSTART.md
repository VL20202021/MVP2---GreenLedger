# 🚀 Green Ledger - Quick Start Guide

## Fastest Way to Get Running (Cloud Database)

### Step 1: Get a Free PostgreSQL Database

Choose one (all have free tiers):

**Option A: Vercel Postgres** (Easiest if deploying to Vercel)
1. Go to https://vercel.com/dashboard
2. Create account/login
3. Go to Storage → Create → Postgres
4. Copy the connection string

**Option B: Supabase** (Recommended - Easy setup)
1. Go to https://supabase.com
2. Create account → New Project
3. Settings → Database → Connection string (URI format)
4. Copy the connection string

**Option C: Neon** (Also great)
1. Go to https://neon.tech
2. Create account → New Project
3. Copy the connection string

### Step 2: Configure Environment

```bash
cd "/Users/vinayaklahiri/MVP_1/MVP2 - GreenLedger"

# Create .env file
cat > .env << EOF
DATABASE_URL="your-connection-string-here"
NEXT_PUBLIC_APP_NAME="Green Ledger"
EOF
```

Replace `your-connection-string-here` with the connection string from Step 1.

### Step 3: Run Setup

```bash
# Run setup script
./setup.sh

# Or manually:
npm install
npx prisma generate
npx prisma migrate dev
```

### Step 4: Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser! 🎉

---

## Deploy to Vercel (Production)

### Option 1: Using Vercel Dashboard (Easiest)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-github-repo-url
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Add environment variable: `DATABASE_URL` = your database connection string
   - Deploy!

3. **Run Migrations**:
   - In Vercel dashboard, go to your project → Settings → Environment Variables
   - Copy the production DATABASE_URL
   - Run locally: `DATABASE_URL="production-url" npx prisma migrate deploy`

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
./scripts/deploy-vercel.sh

# Or manually:
vercel --prod
```

Then add `DATABASE_URL` in Vercel dashboard and run migrations.

---

## Test the Application

Once running, test these flows:

1. **Upload Data** (`/upload`):
   - Upload a CSV with columns like: `isin`, `market_value`, `co2_emissions`, `employees`
   - Example CSV:
     ```csv
     isin,market_value,co2_emissions,employees
     US123456,1000000,500,50
     US789012,2000000,1000,100
     ```

2. **Map Fields** (`/mappings`):
   - Map `co2_emissions` → E1-1
   - Map `employees` → S1-1
   - Save mappings

3. **Generate Report** (`/reports`):
   - Review auto-generated sections
   - Edit content
   - Export to HTML, PDF, or XBRL

4. **View Dashboard** (`/`):
   - See KPI cards with totals

---

## Troubleshooting

### "Cannot find module '@prisma/client'"
```bash
npx prisma generate
```

### "Database connection failed"
- Check your `DATABASE_URL` in `.env`
- Ensure database is accessible
- For cloud databases, check firewall/network settings

### "Puppeteer failed" (PDF export)
- This is expected in some serverless environments
- PDF export may need alternative library for production
- HTML and XBRL exports work fine

### Port 3000 already in use
```bash
# Use different port
PORT=3001 npm run dev
```

---

## Need Help?

- Check `DEPLOYMENT.md` for detailed deployment options
- Check `README.md` for architecture details
- Ensure all dependencies are installed: `npm install`

