#!/bin/bash

echo "🚀 Green Ledger - Production Deployment Helper"
echo "=============================================="
echo ""

# Check if GitHub remote exists
if git remote get-url origin &>/dev/null; then
    echo "✅ GitHub remote already configured"
    REMOTE_URL=$(git remote get-url origin)
    echo "   Remote: $REMOTE_URL"
    echo ""
    read -p "Push to GitHub now? (Y/n): " push_now
    if [ "$push_now" != "n" ] && [ "$push_now" != "N" ]; then
        echo ""
        echo "📤 Pushing to GitHub..."
        git push -u origin main
        if [ $? -eq 0 ]; then
            echo "✅ Code pushed to GitHub!"
        else
            echo "❌ Push failed. Please check your GitHub repository."
            exit 1
        fi
    fi
else
    echo "📋 Step 1: Create GitHub Repository"
    echo "-----------------------------------"
    echo ""
    echo "1. Go to: https://github.com/new"
    echo "2. Repository name: green-ledger (or your choice)"
    echo "3. Description: CSRD/ESRS Reporting Platform"
    echo "4. Choose Public or Private"
    echo "5. DO NOT initialize with README, .gitignore, or license"
    echo "6. Click 'Create repository'"
    echo ""
    read -p "Press Enter when you've created the repository..."
    
    echo ""
    echo "Enter your GitHub username:"
    read -p "Username: " github_username
    
    if [ -z "$github_username" ]; then
        echo "❌ Username required. Exiting."
        exit 1
    fi
    
    echo ""
    read -p "Repository name (default: green-ledger): " repo_name
    repo_name=${repo_name:-green-ledger}
    
    echo ""
    echo "🔗 Adding GitHub remote..."
    git remote add origin "https://github.com/$github_username/$repo_name.git"
    
    echo ""
    echo "📤 Pushing to GitHub..."
    git branch -M main
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo "✅ Code pushed to GitHub!"
        echo ""
        echo "🌐 Repository URL: https://github.com/$github_username/$repo_name"
    else
        echo "❌ Push failed. Please check:"
        echo "   - Repository exists on GitHub"
        echo "   - You have push access"
        echo "   - Your GitHub credentials are configured"
        exit 1
    fi
fi

echo ""
echo "☁️  Step 2: Deploy to Vercel"
echo "-----------------------------"
echo ""
echo "1. Go to: https://vercel.com/new"
echo "2. Sign in with GitHub"
echo "3. Click 'Import Git Repository'"
echo "4. Select: $repo_name (or your repo)"
echo "5. Configure:"
echo "   - Framework: Next.js (auto-detected)"
echo "   - Add Environment Variable:"
echo "     Name: DATABASE_URL"
echo "     Value: [Your database connection string]"
echo "     Environment: Production, Preview, Development"
echo "6. Click 'Deploy'"
echo ""
echo "📋 After deployment:"
echo "1. Get DATABASE_URL from Vercel dashboard"
echo "2. Run: DATABASE_URL=\"your-url\" npx prisma migrate deploy"
echo ""
echo "✅ Your app will be live at: https://your-project.vercel.app"
echo ""
echo "📖 For detailed instructions, see: DEPLOY_NOW.md"

