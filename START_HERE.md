# 🎯 START HERE - Get Green Ledger Running

## Quick Setup (Choose Your Path)

### 🚀 Path 1: I Want to Use It Locally Now (5 minutes)

**Step 1: Get a Free Database**
- Go to https://supabase.com
- Sign up → Create Project → Wait 2 minutes
- Settings → Database → Copy connection string (URI format)

**Step 2: Run Setup**
```bash
cd "/Users/vinayaklahiri/MVP_1/MVP2 - GreenLedger"
./setup-interactive.sh
```

**Step 3: Start the App**
```bash
npm run dev
```

**Step 4: Open Browser**
- Go to: http://localhost:3000

---

### ☁️ Path 2: I Want to Deploy to Production (10 minutes)

**Step 1: Get a Database** (same as above - Supabase, Neon, etc.)

**Step 2: Push to GitHub**
```bash
cd "/Users/vinayaklahiri/MVP_1/MVP2 - GreenLedger"
git init
git add .
git commit -m "Initial commit - Green Ledger"
# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/green-ledger.git
git push -u origin main
```

**Step 3: Deploy to Vercel**
- Go to https://vercel.com/new
- Import your GitHub repository
- Add environment variable: `DATABASE_URL` = your connection string
- Click Deploy!

**Step 4: Run Migrations**
```bash
# Get production DATABASE_URL from Vercel dashboard
DATABASE_URL="your-production-url" npx prisma migrate deploy
```

**Your app is live!** Share the URL with your team.

---

## 🆘 Need Help?

- **Database setup**: See `GET_DATABASE.md`
- **Deployment options**: See `DEPLOYMENT.md`
- **Quick start**: See `QUICKSTART.md`

---

## ✅ What You'll Get

Once running, you can:
- ✅ Upload CSV/Excel files with ESG data
- ✅ Automatically map fields to ESRS taxonomy
- ✅ Generate CSRD reports (E1, S1, G1)
- ✅ Export to HTML, PDF, or XBRL
- ✅ View KPI dashboard

---

## 🎬 Ready? Let's Go!

**For local development, run:**
```bash
./setup-interactive.sh
```

**For production deployment, follow Path 2 above.**

