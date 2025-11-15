# 🛑 Stop All Deployments & Deploy Latest Only

## Option 1: Via Vercel Dashboard (Easiest)

1. **Go to**: https://vercel.com/dashboard
2. **Select your project**: `MVP2---GreenLedger` (or your project name)
3. **Go to Deployments tab**
4. **Cancel queued/in-progress deployments**:
   - Find any deployments with status "Building" or "Queued"
   - Click the "..." menu (three dots) next to each
   - Select "Cancel Deployment"
5. **Trigger a single new deployment**:
   - Click "Redeploy" button (or "Deploy" if no deployments exist)
   - Select the latest commit from the dropdown
   - Click "Redeploy"

## Option 2: Via Vercel CLI

### Step 1: Login to Vercel
```bash
cd "/Users/vinayaklahiri/MVP_1/MVP2 - GreenLedger"
vercel login
```

### Step 2: Link Project (if not already linked)
```bash
vercel link
```

### Step 3: List Deployments
```bash
vercel ls
```

### Step 4: Cancel Queued/In-Progress Deployments
```bash
# List deployments and find their IDs
vercel ls

# Cancel a specific deployment (replace DEPLOYMENT_ID)
vercel rm DEPLOYMENT_ID --yes
```

### Step 5: Deploy Latest Code
```bash
vercel --prod
```

## Option 3: Disable Auto-Deploy (Temporary)

If you want to stop automatic deployments from GitHub pushes temporarily:

1. **Go to**: https://vercel.com/dashboard
2. **Select your project**
3. **Go to**: Settings → Git
4. **Disable**: "Automatic deployments from Git"
5. **Manually deploy** when ready via "Deployments" tab → "Redeploy"

## Quick Fix: Force Single Deployment

The simplest way is to:
1. Cancel all queued deployments in Vercel dashboard
2. Wait for any in-progress builds to finish (or cancel them)
3. Click "Redeploy" and select the latest commit

This ensures only one deployment runs with your latest code.

