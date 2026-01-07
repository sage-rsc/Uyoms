import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { motion, useScroll, useTransform } from 'framer-motion'
import Header from '../components/Header'
import VideoGallery from '../components/VideoGallery'
import FeaturesSection from '../components/FeaturesSection'
import Footer from '../components/Footer'
import { getVideos } from '../utils/storage'

function Home() {
  const [videos, setVideos] = useState([])
  const [initialVideoId, setInitialVideoId] = useState(null)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 200])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  useEffect(() => {
    setVideos(getVideos())

    const urlParams = new URLSearchParams(window.location.search)
    const videoId = urlParams.get('video')
    if (videoId) {
      setInitialVideoId(videoId)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    }
  }, [])

  useEffect(() => {
    const handleStorageChange = () => {
      setVideos(getVideos())
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('videosUpdated', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('videosUpdated', handleStorageChange)
    }
  }, [])

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
          style={{ y: y1 }}
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
          style={{ y: y2 }}
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

      {/* Main Content */}
      <Box className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Header />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <VideoGallery videos={videos} initialVideoId={initialVideoId} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <FeaturesSection />
        </motion.div>
        
        <Footer />
      </Box>
    </Box>
  )
}

export default Home
