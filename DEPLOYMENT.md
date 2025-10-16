# 🚀 Deployment Guide

This guide explains how to deploy the Herdsman game to GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Git repository with the game code
- Node.js installed locally

## 🎯 Deployment Methods

### Method 1: GitHub Actions (Recommended)

1. **Push your code to GitHub**

   ```bash
   git add .
   git commit -m "Add Herdsman game"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy when you push to main branch

3. **Access your game**
   - Your game will be available at: `https://your-username.github.io/your-repo-name`

### Method 2: Manual Deployment

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Create gh-pages branch**

   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   cp -r dist/* .
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Click "Save"

### Method 3: Using GitHub CLI

1. **Install GitHub CLI**

   ```bash
   npm install -g gh
   ```

2. **Deploy directly**
   ```bash
   npm run build
   gh pages deploy dist --branch gh-pages
   ```

## 🔧 Configuration

### Update Repository URLs

Make sure to update the following files with your actual repository information:

- `README.md` - Update demo links
- `package.json` - Update repository field
- `.github/workflows/deploy.yml` - Update if needed

### Custom Domain (Optional)

1. Add a `CNAME` file to the `dist` folder with your domain
2. Configure DNS settings to point to GitHub Pages
3. Enable HTTPS in repository settings

## 🐛 Troubleshooting

### Build Issues

- Make sure all TypeScript errors are fixed
- Run `npm run lint` to check for issues
- Ensure all dependencies are installed

### Deployment Issues

- Check GitHub Actions logs for errors
- Verify repository permissions
- Ensure GitHub Pages is enabled

### Game Not Loading

- Check browser console for errors
- Verify all assets are included in build
- Test locally with `npm run preview`

## 📝 Notes

- The game will be available at `https://your-username.github.io/repository-name`
- GitHub Pages supports custom domains
- HTTPS is automatically enabled
- The deployment is automatic on every push to main branch

## 🎮 Testing

After deployment, test the following:

- [ ] Game loads without errors
- [ ] Hero movement works
- [ ] Animal collection works
- [ ] Scoring system works
- [ ] All game features function properly

---

**Happy Deploying! 🚀**
