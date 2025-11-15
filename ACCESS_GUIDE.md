# 🌐 Where to Use Green Ledger

## 🏠 Local Development (Your Computer)

### Access Locally After Setup

Once you have a database configured, you can access Green Ledger at:

**Main URL**: http://localhost:3000

**Available Pages**:
- **Dashboard**: http://localhost:3000/
- **Upload Data**: http://localhost:3000/upload
- **ESRS Mappings**: http://localhost:3000/mappings
- **CSRD Reports**: http://localhost:3000/reports

### Quick Start (3 Steps)

1. **Get a free database** (takes 2 minutes):
   - Go to https://supabase.com → Sign up → Create Project
   - Copy the connection string from Settings → Database

2. **Configure environment**:
   ```bash
   cd "/Users/vinayaklahiri/MVP_1/MVP2 - GreenLedger"
   echo 'DATABASE_URL="your-supabase-connection-string"' > .env
   ```

3. **Start the app**:
   ```bash
   npx prisma migrate dev --name init
   npm run dev
   ```

4. **Open in browser**: http://localhost:3000

---

## ☁️ Production Deployment (Public Access)

### Option 1: Vercel (Recommended - Free & Easy)

**Your app will be live at**: `https://your-project-name.vercel.app`

**Steps**:
1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Add `DATABASE_URL` environment variable
5. Deploy!

**Access**: Anyone with the URL can use it

### Option 2: Railway

**Your app will be live at**: `https://your-project.up.railway.app`

**Steps**:
1. Install Railway CLI: `npm i -g @railway/cli`
2. Run: `railway login` and `railway init`
3. Add PostgreSQL service in dashboard
4. Deploy: `railway up`

### Option 3: Render

**Your app will be live at**: `https://your-project.onrender.com`

**Steps**:
1. Connect GitHub repo to Render
2. Create PostgreSQL database
3. Set environment variables
4. Deploy

---

## 📱 How to Use the Application

### 1. Upload Your Data
- Go to `/upload`
- Upload CSV or Excel file with columns like:
  - `isin`, `market_value`, `co2_emissions`, `employees`
- Preview your data

### 2. Map to ESRS
- Go to `/mappings`
- Map `co2_emissions` → E1-1 (GHG emissions)
- Map `employees` → S1-1 (Workforce)
- Save mappings

### 3. Generate Report
- Go to `/reports`
- Review auto-generated E1, S1, G1 sections
- Edit content as needed
- Export to HTML, PDF, or XBRL

### 4. View Dashboard
- Go to `/` (home)
- See KPI cards with totals

---

## 🚀 Right Now - Start Using It

### Fastest Way (5 minutes):

```bash
# 1. Get database from Supabase (free)
# Visit: https://supabase.com → Create project → Copy connection string

# 2. Set up environment
cd "/Users/vinayaklahiri/MVP_1/MVP2 - GreenLedger"
echo 'DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-HOST]:5432/postgres"' > .env

# 3. Run migrations
npx prisma migrate dev --name init

# 4. Start server
npm run dev

# 5. Open browser
open http://localhost:3000
```

---

## 🌍 Where Others Can Access It

Once deployed to Vercel/Railway/Render:
- **Share the URL** with your team
- **No installation needed** - works in any browser
- **Accessible from anywhere** - mobile, tablet, desktop
- **Secure** - add authentication later if needed

---

## 📍 Current Status

✅ **Code is ready** - All features implemented
✅ **Builds successfully** - TypeScript compiles
⏳ **Needs database** - Get connection string
⏳ **Needs deployment** - Choose platform

---

## 🎯 Next Action

**Choose one**:

1. **Use locally now**: Get Supabase database → Configure `.env` → Run migrations → `npm run dev`
2. **Deploy to production**: Push to GitHub → Deploy to Vercel → Share URL

Both options take about 5-10 minutes!

