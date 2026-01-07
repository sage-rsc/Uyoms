import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Box, Container, Typography, IconButton, Button } from '@mui/material'
import { ArrowBack, GridView } from '@mui/icons-material'
import VideoCard from '../components/VideoCard'
import { getVideos } from '../utils/storage'

function Gallery() {
  const [videos, setVideos] = useState([])
  const navigate = useNavigate()
  const galleryRef = useRef(null)
  const isInView = useInView(galleryRef, { once: true, amount: 0.1 })

  useEffect(() => {
    const loadedVideos = getVideos()
    setVideos(loadedVideos)
  }, [])

  useEffect(() => {
    const handleStorageChange = () => {
      const loadedVideos = getVideos()
      setVideos(loadedVideos)
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('videosUpdated', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('videosUpdated', handleStorageChange)
    }
  }, [])

  // Preload all thumbnails for instant previews
  useEffect(() => {
    if (videos.length > 0) {
      videos.forEach((video) => {
        const match = video.videoUrl?.match(/\/d\/([a-zA-Z0-9_-]+)/)
        if (match) {
          const fileId = match[1]
          const thumbUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
          const img = new Image()
          img.src = thumbUrl
        } else if (video.posterUrl) {
          const img = new Image()
          img.src = video.posterUrl
        }
      })
    }
  }, [videos])

  return (
    <Box className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-denim/10 relative overflow-hidden">
      {/* Colorful Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-denim/20 via-blue-400/15 to-purple-300/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-300/15 via-denim/20 to-cyan-300/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-denim/10 via-blue-200/10 to-purple-200/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Colorful Accent Lines */}
        <motion.div
          className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-denim/30 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scaleX: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scaleX: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
      </motion.div>

      <Container maxWidth="xl" className="relative z-10 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <Box className="flex items-center justify-between mb-6">
            <Box className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconButton
                  onClick={() => navigate('/')}
                  className="bg-white hover:bg-gray-50 shadow-md border border-gray-200 rounded-xl"
                >
                  <ArrowBack className="text-gray-800" />
                </IconButton>
              </motion.div>
              <Box>
                <Typography
                  variant="h4"
                  className="font-bold text-gray-900"
                  sx={{ fontWeight: 700 }}
                >
                  Video Gallery
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Browse all {videos.length} {videos.length === 1 ? 'video' : 'videos'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* Grid Gallery */}
        {videos.length > 0 ? (
          <motion.div
            ref={galleryRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id || `video-${index}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1,
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                style={{ minHeight: '400px' }}
              >
                <VideoCard
                  video={video}
                  isActive={false}
                  index={index}
                  loadInstantly={true}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Box className="text-center py-20">
            <GridView sx={{ fontSize: 64, color: '#d1d5db', mb: 2 }} />
            <Typography variant="h6" className="text-gray-400 mb-2">
              No videos available
            </Typography>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate('/')}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Back to Home
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default Gallery
