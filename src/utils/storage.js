// LocalStorage utility for video management
const STORAGE_KEY = 'uyoms_videos'
const ADMIN_PASSWORD_KEY = 'uyoms_admin_password'
const INITIALIZED_KEY = 'uyoms_videos_initialized'

// Import default videos from data file
import { videos as defaultVideos } from '../data/videos.js'

// Get videos from localStorage
export const getVideos = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const videos = JSON.parse(stored)
      // Only return stored videos if they exist and aren't empty
      if (Array.isArray(videos) && videos.length > 0) {
        return videos
      }
    }
    
    // Only initialize with default videos ONCE (first time, and only if they're real videos)
    const initialized = localStorage.getItem(INITIALIZED_KEY)
    if (!initialized) {
      // Filter out placeholder videos (ones with YOUR_FILE_ID)
      const realVideos = defaultVideos.filter(v => 
        v.videoUrl && 
        !v.videoUrl.includes('YOUR_FILE_ID') && 
        v.videoUrl.includes('drive.google.com')
      )
      
      if (realVideos.length > 0) {
        setVideos(realVideos)
        localStorage.setItem(INITIALIZED_KEY, 'true')
        return realVideos
      } else {
        // Mark as initialized even if no real videos, so we don't keep checking
        localStorage.setItem(INITIALIZED_KEY, 'true')
      }
    }
    
    // Return empty array if no videos exist (don't show placeholders)
    return []
  } catch (error) {
    console.error('Error loading videos:', error)
    return []
  }
}

// Save videos to localStorage
export const setVideos = (videos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos))
    // Mark as initialized when videos are saved
    localStorage.setItem(INITIALIZED_KEY, 'true')
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('videosUpdated'))
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

// Export videos as JSON string
export const exportVideos = () => {
  const videos = getVideos()
  return JSON.stringify(videos, null, 2)
}

// Import videos from JSON string
export const importVideos = (jsonString) => {
  try {
    const videos = JSON.parse(jsonString)
    if (Array.isArray(videos)) {
      setVideos(videos)
      return true
    }
    return false
  } catch (error) {
    console.error('Error importing videos:', error)
    return false
  }
}

// Reset videos (clear all)
export const resetVideos = () => {
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(INITIALIZED_KEY)
  window.dispatchEvent(new Event('videosUpdated'))
}

