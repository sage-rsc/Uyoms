# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure WhatsApp Number
Create a `.env` file:
```env
VITE_WHATSAPP_NUMBER=1234567890
```
(Format: country code + number, no + or spaces)

### 3. Add Your Portrait Videos
Edit `src/data/videos.js` and replace the placeholder URLs with your Google Drive video links.

**Note**: Videos are displayed in portrait format (9:16), perfect for catalog/product videos.

**To get Google Drive links:**
1. Right-click video in Google Drive
2. Share → "Get link" → "Anyone with the link"
3. Copy the link
4. Extract the File ID (between `/d/` and `/view`)
5. Use format: `https://drive.google.com/file/d/FILE_ID/preview`

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see your gallery!

## 💬 WhatsApp Feature

Each video has a "Contact via WhatsApp" button that:
- Opens WhatsApp with the video title and link
- Includes a deep link to the specific video
- Makes it easy to see which product customers want!

## 📦 Build for Production

```bash
npm run build
```

The `dist` folder will contain your production-ready files.

## 🌐 Deploy to GitHub Pages

1. Push your code to GitHub
2. The GitHub Action will automatically deploy when you push to `main` branch
3. Enable GitHub Pages in your repo settings (if needed)

Your site will be live at: `https://yourusername.github.io/your-repo-name/`

## 🎨 Customize

- **Colors**: Edit `tailwind.config.js`
- **Videos**: Edit `src/data/videos.js`
- **Layout**: Edit `src/components/VideoCarousel.jsx`

Enjoy your beautiful video gallery! 🎉

