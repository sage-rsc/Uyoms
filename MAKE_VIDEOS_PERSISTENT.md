# How to Make Videos Persistent Across All Devices

## The Problem

Videos added via the admin panel are stored in **localStorage**, which is **device/browser-specific**. This means:
- Videos added on your PC won't appear on your mobile
- Videos added on one browser won't appear in another
- Videos are lost if you clear browser data

## The Solution

To make videos **persistent across all devices**, you need to add them to the **data file** (`src/data/videos.js`). This file is baked into the build, so videos in it are available to everyone, on every device.

## Quick Steps (Using the New Feature)

1. **Add videos via admin panel** (on any device)
2. **Click "Copy Data File Code"** button in the admin panel
3. **Open** `src/data/videos.js` in your code editor
4. **Replace** the entire file content with the copied code
5. **Save** the file
6. **Rebuild and deploy**:
   ```bash
   npm run build
   git add .
   git commit -m "Update videos"
   git push
   ```

## Alternative Method (Using Export)

1. **Add videos via admin panel**
2. **Click "Export Videos"** button
3. **Open** the downloaded JSON file
4. **Copy** the video array
5. **Open** `src/data/videos.js`
6. **Replace** the `videos` array with your copied data:
   ```javascript
   export const videos = [
     // Paste your videos here
   ]
   ```
7. **Save** and rebuild

## After Updating the Data File

Once you've updated `src/data/videos.js` and rebuilt:
- ✅ Videos will be available on **all devices**
- ✅ Videos will be available to **all users**
- ✅ Videos will **persist** across browser clears
- ✅ Videos are **baked into the build** (no localStorage needed)

## Important Notes

- Videos in the data file are the **source of truth**
- Videos added via admin are **merged** with data file videos
- If the same video URL exists in both, the admin version takes precedence
- Always update the data file after adding important videos

