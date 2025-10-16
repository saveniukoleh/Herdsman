#!/bin/bash

# Deploy to GitHub Pages
# This script builds the project and pushes the dist folder to the gh-pages branch

echo "🚀 Starting deployment to GitHub Pages..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Create a temporary directory for deployment
TEMP_DIR=$(mktemp -d)
echo "📁 Using temporary directory: $TEMP_DIR"

# Copy dist contents to temp directory
cp -r dist/* "$TEMP_DIR/"

# Initialize git in temp directory
cd "$TEMP_DIR"
git init
git add .
git commit -m "Deploy Herdsman game to GitHub Pages"

# Add remote origin (you'll need to replace with your actual repo URL)
# git remote add origin https://github.com/your-username/herdsman-prototype.git

echo "📝 Please run the following commands manually:"
echo "1. cd $TEMP_DIR"
echo "2. git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git"
echo "3. git push -f origin main:gh-pages"
echo ""
echo "Or use the GitHub CLI:"
echo "gh pages deploy dist --branch gh-pages"

echo "🎉 Deployment preparation complete!"
