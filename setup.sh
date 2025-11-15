#!/bin/bash

echo "🚀 Green Ledger Setup Script"
echo "============================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Database URL - Update this with your PostgreSQL connection string
# For local development: postgresql://localhost:5432/green_ledger?schema=public
# For cloud: Use your provider's connection string
DATABASE_URL="postgresql://localhost:5432/green_ledger?schema=public"

# Optional: App name
NEXT_PUBLIC_APP_NAME="Green Ledger"
EOF
    echo "✅ Created .env file"
    echo "⚠️  Please update DATABASE_URL in .env with your database connection string"
    echo ""
else
    echo "✅ .env file already exists"
    echo ""
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
else
    echo "✅ Dependencies already installed"
    echo ""
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate
echo ""

# Check if database is accessible
if [ -n "$DATABASE_URL" ]; then
    echo "🔍 Checking database connection..."
    npx prisma db pull 2>/dev/null && echo "✅ Database connection successful" || echo "⚠️  Could not connect to database. Please check your DATABASE_URL"
    echo ""
fi

echo "📋 Next steps:"
echo "1. Update DATABASE_URL in .env file"
echo "2. Run: npx prisma migrate dev"
echo "3. Run: npm run dev"
echo ""
echo "For deployment, see DEPLOYMENT.md"

