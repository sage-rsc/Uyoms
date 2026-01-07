# GitHub Pages Deployment Guide

This guide will help you deploy your Uyom's Denim & Co. video gallery to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your computer
3. Your project code ready

## Step-by-Step Instructions

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `uyoms-video-gallery`)
5. Choose **Public** (required for free GitHub Pages)
6. **Don't** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### 2. Initialize Git and Push Your Code

Open your terminal in the project directory and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Uyom's Denim video gallery"

# Add your GitHub repository as remote (replace YOUR_USERNAME and YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Source**: `GitHub Actions`
5. The page will automatically deploy when you push to the `main` branch

### 4. Access Your Site

After deployment (usually takes 1-2 minutes), your site will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

For example, if your username is `jamesfavour` and repo is `uyoms-video-gallery`:
```
https://jamesfavour.github.io/uyoms-video-gallery/
```

## Automatic Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
- Build your React app when you push to `main` branch
- Deploy it to GitHub Pages
- Update the site whenever you make changes

## Manual Deployment

If you need to manually trigger a deployment:

1. Go to your repository on GitHub
2. Click on **Actions** tab
3. Select **Deploy to GitHub Pages** workflow
4. Click **Run workflow** button
5. Select the branch (usually `main`) and click **Run workflow**

## Updating Your Site

Whenever you make changes:

```bash
# Make your changes to the code
# Then commit and push:

git add .
git commit -m "Description of your changes"
git push origin main
```

The site will automatically rebuild and deploy within 1-2 minutes.

## Troubleshooting

### Site shows 404 or blank page
- Wait a few minutes for the first deployment to complete
- Check the **Actions** tab to see if the deployment succeeded
- Make sure you're using the correct URL format

### Build fails
- Check the **Actions** tab for error messages
- Ensure all dependencies are in `package.json`
- Make sure `vite.config.js` has `base: './'` (it already does)

### Routes not working
- The app uses HashRouter which is compatible with GitHub Pages
- URLs will look like: `https://yoursite.com/#/gallery` instead of `https://yoursite.com/gallery`

## Custom Domain (Optional)

If you have a custom domain:

1. Add a `CNAME` file in the `public` folder with your domain name
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings with your custom domain

## Need Help?

- Check GitHub Pages documentation: https://docs.github.com/en/pages
- Check GitHub Actions logs in the **Actions** tab of your repository

