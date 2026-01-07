# 🔴 CRITICAL: Enable GitHub Pages Manually

The error "Resource not accessible by integration" means you **MUST** enable GitHub Pages manually in your repository settings first.

## ⚠️ You Must Do This Before the Workflow Can Deploy

### Step 1: Enable GitHub Pages (REQUIRED)

1. **Go to your repository settings:**
   ```
   https://github.com/sage-rsc/Uyoms/settings/pages
   ```

2. **Under "Source" section:**
   - Click the dropdown that says "None" or "Deploy from a branch"
   - Select: **"GitHub Actions"** ⭐ (This is the key step!)
   - The page will save automatically

3. **Verify it's enabled:**
   - You should see a green checkmark or "GitHub Actions" selected
   - You should see a message like "Your site is ready to be published"

### Step 2: Enable Workflow Permissions (REQUIRED)

1. **Go to Actions settings:**
   ```
   https://github.com/sage-rsc/Uyoms/settings/actions
   ```

2. **Scroll down to "Workflow permissions"**

3. **Select:**
   - ☑ **"Read and write permissions"**
   - ☑ **"Allow GitHub Actions to create and approve pull requests"**

4. **Click "Save"**

### Step 3: Push the Updated Workflow

```bash
git add .github/workflows/deploy.yml
git commit -m "Update deployment workflow"
git push origin main
```

### Step 4: Re-run the Workflow

1. Go to: **https://github.com/sage-rsc/Uyoms/actions**
2. Click on the latest (failed) workflow run
3. Click **"Re-run all jobs"** button (top right)
4. Wait 2-3 minutes

## ✅ After Enabling

Once Pages is enabled, your site will be live at:
**https://sage-rsc.github.io/Uyoms/**

You can check the deployment status in:
- **Settings → Pages** (shows your site URL)
- **Actions** tab (shows deployment progress)

## 🎯 Why This Happens

GitHub requires you to manually enable Pages the first time. After that, the workflow can deploy automatically. The workflow cannot enable Pages itself - you must do it in the repository settings.

## 📸 Visual Guide

**Pages Settings Should Show:**
```
Source: [GitHub Actions ▼]  ← Select this!
```

**NOT:**
```
Source: [None ▼]  ← Wrong!
Source: [Deploy from a branch ▼]  ← Wrong!
```

---

**Once you enable Pages in settings, push the workflow update and re-run. It will work!** 🚀

