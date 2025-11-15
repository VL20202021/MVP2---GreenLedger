# 🗄️ Get Your Free Database (2 Minutes)

## Option 1: Supabase (Recommended - Easiest)

1. **Go to**: https://supabase.com
2. **Click**: "Start your project" or "Sign up"
3. **Create account** (or sign in with GitHub)
4. **Click**: "New Project"
5. **Fill in**:
   - Project name: `green-ledger` (or any name)
   - Database password: **Save this password!**
   - Region: Choose closest to you
6. **Click**: "Create new project"
7. **Wait 2 minutes** for database to initialize
8. **Get connection string**:
   - Go to: Settings (gear icon) → Database
   - Scroll to "Connection string"
   - Select "URI" tab
   - Copy the connection string
   - It looks like: `postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres`

## Option 2: Neon (Also Great)

1. **Go to**: https://neon.tech
2. **Click**: "Sign up" (or sign in with GitHub)
3. **Click**: "Create a project"
4. **Fill in**:
   - Project name: `green-ledger`
   - Region: Choose closest
5. **Click**: "Create project"
6. **Copy connection string** from the dashboard
   - It's shown right after creation
   - Format: `postgresql://user:password@host/database`

## Option 3: Vercel Postgres (If deploying to Vercel)

1. **Go to**: https://vercel.com/dashboard
2. **Click**: Storage → Create → Postgres
3. **Select region** and create
4. **Copy connection string** from the dashboard

---

## ✅ Once You Have the Connection String

Come back here and I'll help you:
1. Set up the `.env` file
2. Run database migrations
3. Start the application

**Your connection string should look like**:
```
postgresql://user:password@host:port/database
```

