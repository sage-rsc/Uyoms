# Enable GitHub Pages - Step by Step

The error you're seeing means GitHub Pages isn't enabled in your repository settings. Follow these steps:

## Step 1: Enable GitHub Pages

1. Go to your repository: `https://github.com/sage-rsc/Uyoms`
2. Click on **Settings** (top menu, next to Insights)
3. Scroll down and click **Pages** in the left sidebar

## Step 2: Configure Pages Source

In the Pages settings:

1. Under **Source**, you'll see a dropdown
2. **IMPORTANT:** Select **"GitHub Actions"** (NOT "Deploy from a branch")
3. The page will save automatically

## Step 3: Enable Workflow Permissions

1. Still in **Settings**, click **Actions** → **General** (left sidebar)
2. Scroll down to **Workflow permissions**
3. Select: **"Read and write permissions"**
4. Check the box: ✅ **"Allow GitHub Actions to create and approve pull requests"**
5. Click **Save**

## Step 4: Push Your Code

After enabling Pages, push your code:

```bash
git add .
git commit -m "Update deployment workflow"
git push origin main
```

## Step 5: Verify Deployment

1. Go to **Actions** tab in your repository
2. You should see "Deploy to GitHub Pages" workflow running
3. Wait 2-3 minutes for it to complete
4. Go back to **Settings** → **Pages**
5. Your site URL will be displayed there: `https://sage-rsc.github.io/Uyoms/`

## Visual Guide

### Pages Settings Should Look Like:
```
Source: [GitHub Actions ▼]  ← Select this!
```

### Workflow Permissions Should Look Like:
```
☑ Read and write permissions
☑ Allow GitHub Actions to create and approve pull requests
```

## Common Issues

### "Not Found" Error
- Make sure you selected **"GitHub Actions"** as the source (not a branch)
- Wait a few minutes after enabling - GitHub needs time to set up

### Workflow Still Failing
- Make sure you saved the workflow permissions
- Check that your repository is **Public** (required for free GitHub Pages)
- Or you have GitHub Pro/Team (for private repos)

### Can't Find Pages Settings
- Make sure you're the repository owner or have admin access
- The Settings tab is only visible to repository admins

## After Setup

Once enabled, every time you push to `main`:
- The workflow will automatically build your app
- Deploy it to GitHub Pages
- Your site will update within 2-3 minutes

Your site will be live at:
```
https://sage-rsc.github.io/Uyoms/
```

