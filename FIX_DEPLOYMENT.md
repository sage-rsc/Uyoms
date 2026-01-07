# Fix GitHub Pages Deployment Error (403)

The error you're seeing is because GitHub Pages permissions aren't set up correctly. Follow these steps:

## Step 1: Enable GitHub Pages Permissions

1. Go to your repository on GitHub: `https://github.com/sage-rsc/Uyoms`
2. Click **Settings** (top menu)
3. Scroll down to **Actions** → **General** (in left sidebar)
4. Scroll down to **Workflow permissions**
5. Select: **Read and write permissions**
6. Check: ✅ **Allow GitHub Actions to create and approve pull requests**
7. Click **Save**

## Step 2: Configure GitHub Pages Source

1. Still in **Settings**, go to **Pages** (left sidebar)
2. Under **Source**, select: **GitHub Actions** (NOT "Deploy from a branch")
3. The page will save automatically

## Step 3: Delete Old Workflow (if exists)

If you have an old workflow using `peaceiris/actions-gh-pages`:

1. Go to **Actions** tab in your repository
2. Check if there's an old workflow file
3. If you see `peaceiris/actions-gh-pages` in any workflow, delete that workflow file from `.github/workflows/` folder

## Step 4: Push the Correct Workflow

Make sure the workflow file I created is in your repository:

```bash
# Check if the workflow file exists
ls -la .github/workflows/deploy.yml

# If it exists, commit and push it
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

## Step 5: Trigger Deployment

After pushing, the workflow should run automatically. To manually trigger:

1. Go to **Actions** tab
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

## Step 6: Verify Deployment

1. Wait 1-2 minutes for deployment to complete
2. Check the **Actions** tab - you should see a green checkmark ✅
3. Go to **Settings** → **Pages**
4. Your site URL will be shown there: `https://sage-rsc.github.io/Uyoms/`

## If Still Getting Errors

### Option A: Use Personal Access Token (Old Method)

If the above doesn't work, you can use a Personal Access Token:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` and `workflow` permissions
3. Add it as a secret in your repository:
   - Repository → Settings → Secrets and variables → Actions
   - New repository secret
   - Name: `GH_PAGES_TOKEN`
   - Value: (paste your token)
4. Update the workflow to use the token (but this is not recommended - use the method above instead)

### Option B: Check Repository Settings

Make sure:
- Repository is **Public** (required for free GitHub Pages)
- Or you have GitHub Pro/Team (for private repos with Pages)

## Your Site URL

Once deployed, your site will be at:
```
https://sage-rsc.github.io/Uyoms/
```

Note: The first deployment might take 5-10 minutes. Be patient!

