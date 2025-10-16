#!/bin/bash

# Build the project with correct base path
echo "🔨 Building project..."
npm run build

# Create a temporary directory for deployment
echo "📁 Preparing deployment files..."
rm -rf deploy-temp
mkdir deploy-temp
cp -r dist/* deploy-temp/

# Switch to gh-pages branch
echo "🌿 Switching to gh-pages branch..."
git stash
git checkout gh-pages

# Remove all files except .git
echo "🧹 Cleaning gh-pages branch..."
git rm -rf . 2>/dev/null || true

# Copy new files
echo "📋 Copying new files..."
cp -r deploy-temp/* .

# Add and commit
echo "💾 Committing changes..."
git add .
git commit -m "Deploy Herdsman game with fixed base path"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin gh-pages

# Clean up
echo "🧹 Cleaning up..."
rm -rf deploy-temp

# Switch back to main
echo "↩️ Switching back to main branch..."
git checkout main
git stash pop

echo "✅ Deployment complete!"
echo "🎮 Your game should be available at: https://saveniukoleh.github.io/Herdsman/"
