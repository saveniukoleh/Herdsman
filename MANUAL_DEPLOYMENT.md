# 🚀 Manual Deployment Guide

Since the automatic deployment is having permission issues, here are several ways to deploy manually:

## Method 1: Using GitHub CLI (Recommended)

1. **Install GitHub CLI** (if not already installed):

   ```bash
   npm install -g gh
   ```

2. **Login to GitHub**:

   ```bash
   gh auth login
   ```

3. **Deploy directly**:
   ```bash
   npm run build
   gh pages deploy dist --branch gh-pages
   ```

## Method 2: Manual Git Deployment

1. **Build the project**:

   ```bash
   npm run build
   ```

2. **Create and switch to gh-pages branch**:

   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   ```

3. **Copy built files**:

   ```bash
   cp -r dist/* .
   git add .
   git commit -m "Deploy Herdsman game to GitHub Pages"
   git push origin gh-pages
   ```

4. **Switch back to main branch**:
   ```bash
   git checkout main
   ```

## Method 3: Using Personal Access Token

1. **Create a Personal Access Token**:
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Generate new token with `repo` and `workflow` permissions
   - Copy the token

2. **Add token to repository secrets**:
   - Go to repository Settings > Secrets and variables > Actions
   - Add new secret named `PERSONAL_ACCESS_TOKEN`
   - Paste your token

3. **Use the alternative workflow**:
   - The `.github/workflows/deploy-alternative.yml` file is ready
   - Push your changes and the workflow will use the token

## Method 4: Direct File Upload

1. **Build the project**:

   ```bash
   npm run build
   ```

2. **Zip the dist folder**:

   ```bash
   cd dist
   zip -r ../herdsman-game.zip .
   cd ..
   ```

3. **Upload to GitHub Pages**:
   - Go to repository Settings > Pages
   - Choose "Upload files" option
   - Upload the zip file

## 🔧 Fixing Repository Permissions

If you want to fix the automatic deployment:

1. **Check repository settings**:
   - Go to repository Settings > Actions > General
   - Under "Workflow permissions", select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"

2. **Enable GitHub Pages**:
   - Go to Settings > Pages
   - Under "Source", select "GitHub Actions"
   - Save the settings

3. **Re-run the workflow**:
   - Go to Actions tab
   - Find the failed workflow
   - Click "Re-run all jobs"

## 🎮 After Deployment

Your game will be available at:
`https://saveniukoleh.github.io/Herdsman/`

## 🐛 Troubleshooting

### If GitHub CLI doesn't work:

- Make sure you're logged in: `gh auth status`
- Check permissions: `gh auth refresh`

### If manual git deployment fails:

- Make sure you have push permissions to the repository
- Check if the gh-pages branch exists: `git branch -a`

### If the game doesn't load:

- Check the browser console for errors
- Verify all files are in the dist folder
- Test locally with `npm run preview`

## 📝 Quick Commands

```bash
# Build and deploy in one go
npm run build && gh pages deploy dist --branch gh-pages

# Check deployment status
gh pages list

# View deployment logs
gh run list
```

---

**Choose the method that works best for you! 🚀**
