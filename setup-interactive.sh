#!/bin/bash

echo "🚀 Green Ledger Interactive Setup"
echo "=================================="
echo ""

# Check if .env exists
if [ -f .env ]; then
    echo "⚠️  .env file already exists"
    read -p "Do you want to overwrite it? (y/N): " overwrite
    if [ "$overwrite" != "y" ] && [ "$overwrite" != "Y" ]; then
        echo "Keeping existing .env file"
        USE_EXISTING=true
    fi
fi

if [ "$USE_EXISTING" != "true" ]; then
    echo ""
    echo "📋 Step 1: Database Setup"
    echo "-------------------------"
    echo ""
    echo "You need a PostgreSQL database. Choose an option:"
    echo ""
    echo "1. Supabase (Recommended - Free, Easy)"
    echo "   → Visit: https://supabase.com"
    echo "   → Create account → New Project"
    echo "   → Settings → Database → Copy connection string (URI format)"
    echo ""
    echo "2. Neon (Also Great - Free)"
    echo "   → Visit: https://neon.tech"
    echo "   → Create account → New Project"
    echo "   → Copy connection string"
    echo ""
    echo "3. I already have a database connection string"
    echo ""
    read -p "Enter your choice (1-3): " db_choice
    
    if [ "$db_choice" = "3" ]; then
        echo ""
        echo "Paste your DATABASE_URL connection string:"
        echo "(Format: postgresql://user:password@host:port/database)"
        read -p "DATABASE_URL: " db_url
        
        if [ -z "$db_url" ]; then
            echo "❌ No connection string provided. Exiting."
            exit 1
        fi
        
        # Create .env file
        cat > .env << EOF
DATABASE_URL="$db_url"
NEXT_PUBLIC_APP_NAME="Green Ledger"
EOF
        
        echo "✅ .env file created!"
    else
        echo ""
        echo "Please visit the website to create your database, then:"
        echo "1. Copy the connection string"
        echo "2. Run this script again and choose option 3"
        echo ""
        echo "Or create .env manually with:"
        echo '  echo "DATABASE_URL=\"your-connection-string\"" > .env'
        exit 0
    fi
fi

echo ""
echo "📦 Step 2: Installing dependencies (if needed)..."
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🔧 Step 3: Generating Prisma client..."
npx prisma generate

echo ""
echo "🗄️  Step 4: Running database migrations..."
echo "This will create all necessary tables in your database."
read -p "Continue? (Y/n): " run_migrations

if [ "$run_migrations" != "n" ] && [ "$run_migrations" != "N" ]; then
    npx prisma migrate dev --name init
    if [ $? -eq 0 ]; then
        echo "✅ Database migrations completed!"
    else
        echo "❌ Migration failed. Please check your DATABASE_URL in .env"
        exit 1
    fi
else
    echo "⏭️  Skipping migrations. Run manually with: npx prisma migrate dev"
fi

echo ""
echo "✅ Setup Complete!"
echo ""
echo "🚀 Next steps:"
echo "1. Start the development server:"
echo "   npm run dev"
echo ""
echo "2. Open your browser:"
echo "   http://localhost:3000"
echo ""
echo "3. Test the application:"
echo "   - Upload a CSV file at /upload"
echo "   - Map fields at /mappings"
echo "   - Generate reports at /reports"
echo ""

