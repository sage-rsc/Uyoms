# Uyom's Denim & Co. - Video Gallery

A beautiful, modern video gallery built with React, Tailwind CSS, and Swiper.js featuring hover-to-play functionality and smooth animations.

## 🚀 Tech Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing (HashRouter for GitHub Pages)
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Player** - Versatile video player
- **Framer Motion** - Smooth animations
- **React Icons** - Beautiful icons
- **LocalStorage** - Client-side data persistence

## ✨ Features

- 🎥 **Portrait Video Gallery** - Optimized for vertical/portrait catalog videos (9:16 aspect ratio)
- 🛠️ **Admin Panel** - Full CRUD interface to add, edit, and remove videos (no backend needed!)
- 💾 **LocalStorage** - All data stored locally in browser (works on GitHub Pages)
- 🔐 **Password Protection** - Secure admin access with password
- 📱 **WhatsApp Integration** - Direct contact buttons that share video links
- 🔗 **Deep Linking** - WhatsApp links include direct video URLs for easy reference
- ✨ **Hover to Play** - Videos automatically play on hover
- 📱 **Fully Responsive** - Perfect on desktop, tablet, and mobile
- 🎨 **Modern Design** - Elegant dark theme with white and denim blue branding
- 🎬 **Auto-play** - Videos play when in view
- 🌊 **Smooth Animations** - Powered by Framer Motion

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🔗 Getting Your Google Drive Video Links

1. **Open Google Drive** and locate your video file
2. **Right-click** on the video file
3. Click **"Share"** → **"Get link"**
4. Change the sharing setting to **"Anyone with the link"**
5. Copy the link

The link will look like:
```
https://drive.google.com/file/d/1ABC123xyz789/view?usp=sharing
```

6. Extract the **File ID** (the part between `/d/` and `/view`):
   - File ID: `1ABC123xyz789`

7. Use this format in `src/data/videos.js`:
   ```javascript
   videoUrl: 'https://drive.google.com/file/d/1ABC123xyz789/preview'
   ```

## ⚙️ Configuration

### 1. Configure WhatsApp Number

Create a `.env` file in the root directory:

```env
VITE_WHATSAPP_NUMBER=1234567890
```

**Format**: Country code + number (no +, spaces, or dashes)
- Example: `2341234567890` for Nigeria
- Example: `1234567890` for US

Or edit `src/config/whatsapp.js` directly.

### 2. Using the Admin Panel

**Access Admin Panel:**
1. Click the gear icon (⚙️) in the top-right corner of the gallery
2. Or navigate to `#/admin` in your browser
3. Default password: `admin123`

**Add Videos:**
1. Click "Add New Video" button
2. Fill in:
   - **Product Name** (required)
   - **Description** (optional)
   - **Video URL** (required) - Google Drive link
   - **Poster Image URL** (optional)
3. Click "Add Video"

**Edit Videos:**
1. Click "Edit" on any video card
2. Modify the fields
3. Click "Update Video"

**Delete Videos:**
1. Click "Delete" on any video card
2. Confirm deletion

**Note**: All videos are stored in browser localStorage, so they persist across sessions but are specific to each browser/device.

### 3. Manual Video Configuration (Alternative)

If you prefer to edit code directly, edit `src/utils/storage.js` to modify default videos.

## 🌐 Hosting on GitHub Pages

### Method 1: Using GitHub Actions (Recommended)

1. Create a `.github/workflows/deploy.yml` file:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

2. Push to GitHub and the site will auto-deploy!

### Method 2: Manual Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Push the `dist` folder to the `gh-pages` branch:**
   ```bash
   npm install -g gh-pages
   gh-pages -d dist
   ```

3. Enable GitHub Pages in repository settings (use `gh-pages` branch)

### Update Vite Config for GitHub Pages

If your repo name is not the root, update `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Add your repo name here
  build: {
    outDir: 'dist',
  },
})
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize colors:

```javascript
colors: {
  gold: {
    DEFAULT: '#d4af37',
    light: '#e5c866',
    dark: '#b8941f',
  },
  dark: {
    DEFAULT: '#1a1a1a',
    light: '#2d2d2d',
  },
}
```

### Carousel Settings

Edit `src/components/VideoCarousel.jsx` to customize:
- `spaceBetween` - Gap between slides
- `autoplay.delay` - Auto-play delay
- `slidesPerView` - Number of visible slides

## 📱 Responsive Breakpoints

- **Mobile**: 1 video per view (< 768px)
- **Tablet**: 2 videos per view (768px - 1024px)
- **Desktop**: 3-4 videos per view (> 1024px)

## 🛠️ Admin Panel Features

### Access
- Navigate to `#/admin` or click the gear icon (⚙️) on the gallery page
- Default password: `admin123`
- Password is stored in localStorage (change it in `src/utils/storage.js`)

### Features
- ✅ Add new videos with product name, description, and video URL
- ✅ Edit existing videos
- ✅ Delete videos with confirmation
- ✅ Real-time updates (changes reflect immediately)
- ✅ Beautiful, modern UI with animations
- ✅ No backend required - everything works client-side!

### Data Storage
- Videos are stored in browser localStorage
- Data persists across browser sessions
- Each browser/device has its own data
- Perfect for static hosting (GitHub Pages, Netlify, etc.)

## 💬 WhatsApp Integration

Each video card includes a **"Contact via WhatsApp"** button that:
- Opens WhatsApp with a pre-filled message
- Includes the video title
- Contains a direct link to the specific video (deep link)
- Allows you to see exactly which video the customer is interested in

**How it works:**
1. Customer clicks "Contact via WhatsApp" button
2. WhatsApp opens with message: "Hi! I'm interested in this video: [Title]"
3. Message includes a link like: `yoursite.com?video=video1`
4. When you click the link, it opens the gallery and scrolls to that specific video

This makes it easy to see which product the customer wants!

## 🌟 Alternative Free Hosting

- **Netlify**: Connect your GitHub repo at [netlify.com](https://netlify.com)
- **Vercel**: Connect your GitHub repo at [vercel.com](https://vercel.com)
- **Cloudflare Pages**: Similar to GitHub Pages

## 📝 Notes

- Google Drive videos must be set to "Anyone with the link" to work
- For better performance, consider using a CDN or video hosting service
- Large video files may take time to load on slower connections

## 📄 License

© 2024 Uyom's Denim & Co. All rights reserved.
