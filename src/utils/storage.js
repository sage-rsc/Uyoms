// LocalStorage utility for video management
const STORAGE_KEY = 'uyoms_videos'
const ADMIN_PASSWORD_KEY = 'uyoms_admin_password'

// Default videos (fallback)
const defaultVideos = [
  {
    id: 'video1',
    title: 'Denim Jacket - Classic Blue',
    description: 'Premium denim jacket with classic fit. Perfect for any occasion.',
    videoUrl: 'https://drive.google.com/file/d/YOUR_FILE_ID_1/preview',
    posterUrl: '',
  },
]

// Get videos from localStorage
export const getVideos = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
    // Initialize with default videos if nothing exists
    setVideos(defaultVideos)
    return defaultVideos
  } catch (error) {
    console.error('Error loading videos:', error)
    return defaultVideos
  }
}

// Save videos to localStorage
export const setVideos = (videos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos))
    return true
  } catch (error) {
    console.error('Error saving videos:', error)
    return false
  }
}

// Add a new video
export const addVideo = (video) => {
  const videos = getVideos()
  const newVideo = {
    ...video,
    id: video.id || `video-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  }
  const updatedVideos = [...videos, newVideo]
  setVideos(updatedVideos)
  return updatedVideos
}

// Remove a video by ID
export const removeVideo = (videoId) => {
  const videos = getVideos()
  const updatedVideos = videos.filter(v => v.id !== videoId)
  setVideos(updatedVideos)
  return updatedVideos
}

// Update a video
export const updateVideo = (videoId, updates) => {
  const videos = getVideos()
  const updatedVideos = videos.map(v => 
    v.id === videoId ? { ...v, ...updates } : v
  )
  setVideos(updatedVideos)
  return updatedVideos
}

// Admin password management
export const setAdminPassword = (password) => {
  try {
    localStorage.setItem(ADMIN_PASSWORD_KEY, password)
    return true
  } catch (error) {
    console.error('Error saving password:', error)
    return false
  }
}

export const getAdminPassword = () => {
  try {
    return localStorage.getItem(ADMIN_PASSWORD_KEY) || 'admin123' // Default password
  } catch (error) {
    return 'admin123'
  }
}

export const checkAdminPassword = (password) => {
  return password === getAdminPassword()
}

