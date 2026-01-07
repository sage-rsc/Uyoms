// LocalStorage utility for video management
const STORAGE_KEY = 'uyoms_videos'
const ADMIN_PASSWORD_KEY = 'uyoms_admin_password'
const INITIALIZED_KEY = 'uyoms_videos_initialized'

// Import default videos from data file
import { videos as defaultVideos } from '../data/videos.js'

// Get videos - always merge data file videos (persistent) with localStorage videos (user-added)
export const getVideos = () => {
  try {
    // Always get real videos from data file (these are persistent across all users)
    const realDefaultVideos = defaultVideos.filter(v => 
      v.videoUrl && 
      !v.videoUrl.includes('YOUR_FILE_ID') && 
      v.videoUrl.includes('drive.google.com')
    )
    
    // Get user-added videos from localStorage
    const stored = localStorage.getItem(STORAGE_KEY)
    let userVideos = []
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          userVideos = parsed
        }
      } catch (e) {
        console.error('Error parsing stored videos:', e)
      }
    }
    
    // Merge: data file videos + user-added videos
    // Use a Map to avoid duplicates based on video URL
    const videoMap = new Map()
    
    // First, add all default videos from data file (these are the persistent ones)
    realDefaultVideos.forEach(video => {
      if (video.videoUrl) {
        videoMap.set(video.videoUrl, video)
      }
    })
    
    // Then, add user-added videos (these override defaults if same URL, or add new ones)
    userVideos.forEach(video => {
      if (video.videoUrl) {
        videoMap.set(video.videoUrl, video)
      }
    })
    
    // Convert map back to array
    const mergedVideos = Array.from(videoMap.values())
    
    // If we have merged videos, save them back to localStorage for consistency
    if (mergedVideos.length > 0 && userVideos.length !== mergedVideos.length) {
      // Only update if there's a difference (to avoid unnecessary writes)
      const hasNewVideos = mergedVideos.some(v => 
        !realDefaultVideos.some(dv => dv.videoUrl === v.videoUrl)
      )
      if (hasNewVideos) {
        // Save merged videos to localStorage (but mark which are user-added)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedVideos))
        localStorage.setItem(INITIALIZED_KEY, 'true')
      }
    }
    
    return mergedVideos
  } catch (error) {
    console.error('Error loading videos:', error)
    // Fallback: try to return just default videos
    try {
      return defaultVideos.filter(v => 
        v.videoUrl && 
        !v.videoUrl.includes('YOUR_FILE_ID') && 
        v.videoUrl.includes('drive.google.com')
      )
    } catch (e) {
      return []
    }
  }
}

// Save videos to localStorage
// Note: This saves ALL videos (including data file videos), but getVideos() will merge them
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

