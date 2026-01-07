# Why Videos Don't Show After Build

## The Problem

Videos are stored in **localStorage**, which is **browser-specific**. This means:
- Videos you add in development are stored in your browser's localStorage
- When you build, the built version doesn't have access to your dev browser's localStorage
- Each browser/device has its own separate localStorage
- Videos don't persist across builds or different browsers

## Solutions

### Option 1: Export/Import (Recommended for Quick Transfer)

**Before building:**
1. In development, go to Admin panel (`/admin`)
2. Click **"Export Videos"** button
3. Save the JSON file somewhere safe

**After building:**
1. Open the built version
2. Go to Admin panel
3. Click **"Import Videos"** button
4. Select the JSON file you saved
5. Videos will be restored!

### Option 2: Add Videos to Data File (Recommended for Permanent Storage)

Add your videos directly to `src/data/videos.js` so they're included in the build:

1. Export videos from dev (see Option 1)
2. Open the JSON file
3. Copy the video data
4. Paste it into `src/data/videos.js` replacing the placeholder videos
5. Rebuild - videos will be included!

### Option 3: Use Both Methods

- Add frequently used videos to `src/data/videos.js` (permanent)
- Use export/import for temporary or user-specific videos

## Quick Steps to Fix Right Now

1. **In Development:**
   - Go to `http://localhost:5173/#/admin`
   - Click "Export Videos"
   - Save the file

2. **In Built Version:**
   - Go to `https://sage-rsc.github.io/Uyoms/admin`
   - Click "Import Videos"
   - Select the exported file

Your videos will appear!

