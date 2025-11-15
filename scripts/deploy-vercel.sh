#!/bin/bash

echo "🚀 Deploying Green Ledger to Vercel"
echo "===================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm i -g vercel
    echo ""
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
    echo ""
fi

echo "📤 Deploying to Vercel..."
echo ""

# Deploy
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Don't forget to:"
echo "1. Set DATABASE_URL in Vercel dashboard (Settings → Environment Variables)"
echo "2. Run migrations: vercel env pull .env.local && npx prisma migrate deploy"
echo ""

