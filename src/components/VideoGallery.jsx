import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Box, Typography, Container, IconButton, Button } from '@mui/material'
import { ChevronLeft, ChevronRight, GridView, ArrowForward } from '@mui/icons-material'
import VideoCard from './VideoCard'

const VideoGallery = ({ videos, initialVideoId }) => {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const galleryRef = useRef(null)
  const isInView = useInView(galleryRef, { once: true, amount: 0.1 })

  useEffect(() => {
    if (initialVideoId) {
      const index = videos.findIndex(v => v.id === initialVideoId)
      if (index !== -1) {
        setCurrentIndex(index)
      }
    }
  }, [initialVideoId, videos])

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length)
  }

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }

  // Get visible videos with cards on both sides
  const getVisibleVideos = () => {
    const visible = []
    // Show previous, current, and next videos
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + videos.length) % videos.length
      visible.push({ 
        ...videos[index], 
        stackIndex: i + 1, // 0, 1, 2
        position: i // -1 (left), 0 (center), 1 (right)
      })
    }
    return visible
  }

  const visibleVideos = getVisibleVideos()

  // Preload thumbnails for visible videos
  useEffect(() => {
    const preloadThumbnails = () => {
      visibleVideos.forEach((video) => {
        const match = video.videoUrl?.match(/\/d\/([a-zA-Z0-9_-]+)/)
        if (match) {
          const fileId = match[1]
          const thumbUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
          const img = new Image()
          img.src = thumbUrl
        }
      })
    }
    preloadThumbnails()
  }, [visibleVideos])

  return (
    <Box className="py-20 md:py-28 bg-transparent relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-denim/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-denim/3 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
      </motion.div>

      <Container maxWidth="lg" className="relative z-10">
        <motion.div
          ref={galleryRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { 
                opacity: 1, 
                scale: 1,
              } : { 
                opacity: 0, 
                scale: 0.9 
              }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block mb-6"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="inline-block"
              >
                <Typography
                  variant="overline"
                  className="text-gray-400 uppercase tracking-[0.3em] text-xs font-medium inline-block px-4 py-2 bg-gray-50 rounded-full"
                >
                  Collection
                </Typography>
              </motion.div>
            </motion.div>

            <Typography
              variant="h2"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              sx={{ 
                fontWeight: 800,
                letterSpacing: '-0.02em',
              }}
            >
              Discover Our{' '}
              <motion.span
                className="text-denim relative inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { 
                  opacity: 1, 
                  x: 0,
                  scale: [1, 1.01, 1],
                } : { 
                  opacity: 0, 
                  x: -20 
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5,
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                }}
              >
                Collection
                <motion.span
                  className="absolute bottom-2 left-0 right-0 h-3 bg-denim/20 -z-10"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { 
                    scaleX: 1,
                    opacity: [0.3, 0.5, 0.3],
                  } : { 
                    scaleX: 0 
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.9,
                    opacity: {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                  }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.span>
            </Typography>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
              } : { 
                opacity: 0, 
                y: 20 
              }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex justify-center"
            >
              <motion.div
                animate={{
                  opacity: [1, 0.95, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-center"
              >
                <Typography
                  variant="h6"
                  className="text-lg md:text-xl text-gray-600 leading-relaxed font-light"
                  sx={{ 
                    fontWeight: 300,
                    textAlign: 'center',
                    display: 'block',
                  }}
                >
                  From casual wear to formal occasions, our denim pieces adapt to fit your style and needs.
                </Typography>
              </motion.div>
            </motion.div>

            {/* Modern View All Gallery Button */}
            {videos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0,
                } : { 
                  opacity: 0, 
                  y: 20 
                }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mt-8"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    onClick={() => navigate('/gallery')}
                    className="bg-gradient-to-r from-denim to-blue-600 hover:from-blue-600 hover:to-denim text-white rounded-xl px-8 py-3 shadow-lg"
                    sx={{ 
                      textTransform: 'none', 
                      fontWeight: 600,
                      fontSize: '1rem',
                      boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
                      '&:hover': {
                        boxShadow: '0 6px 20px rgba(59, 130, 246, 0.5)',
                      }
                    }}
                  >
                    View All Videos
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* Centered Stacked Carousel */}
          {videos.length > 0 && (
            <Box className="relative">
              <Box className="relative h-[650px] md:h-[750px] flex items-center justify-center">
                {/* Stacked Cards - Centered with cards on both sides */}
                <AnimatePresence mode="wait">
                  {visibleVideos.map((video, idx) => {
                    const isActive = video.position === 0
                    const isLeft = video.position === -1
                    const isRight = video.position === 1
                    
                    const zIndex = isActive ? 30 : isLeft ? 20 : 25
                    const scale = isActive ? 1 : 0.85
                    const xOffset = isLeft ? -200 : isRight ? 200 : 0
                    const opacity = isActive ? 1 : 0.6
                    const rotation = isLeft ? -10 : isRight ? 10 : 0

                    return (
                      <motion.div
                        key={`${video.id}-${currentIndex}-${video.position}`}
                        initial={{ 
                          opacity: 0,
                          scale: 0.85,
                          x: isLeft ? -400 : isRight ? 400 : (isLeft ? -400 : 400),
                          rotateY: isLeft ? -20 : isRight ? 20 : 0,
                        }}
                        animate={{
                          opacity: opacity,
                          scale: scale,
                          x: xOffset,
                          y: 0,
                          rotateY: rotation,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.85,
                          x: isLeft ? 400 : -400,
                          rotateY: isLeft ? 20 : -20,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: [0.4, 0, 0.2, 1],
                          delay: idx * 0.05,
                        }}
                        style={{
                          position: 'absolute',
                          zIndex: zIndex,
                          width: '320px',
                          maxWidth: '90%',
                          transformStyle: 'preserve-3d',
                        }}
                        whileHover={isActive ? {
                          scale: 1.08,
                          y: -20,
                          transition: { duration: 0.4, ease: 'easeOut' }
                        } : {
                          scale: scale + 0.1,
                          y: -10,
                          transition: { duration: 0.3 }
                        }}
                        className="cursor-pointer"
                        onClick={(e) => {
                          if (!isActive) {
                            e.stopPropagation()
                            if (isLeft) {
                              setCurrentIndex((currentIndex - 1 + videos.length) % videos.length)
                            } else {
                              setCurrentIndex((currentIndex + 1) % videos.length)
                            }
                          }
                        }}
                      >
                        {/* Enhanced Shadow */}
                        <motion.div
                          className="absolute inset-0 rounded-3xl"
                          style={{
                            background: `linear-gradient(135deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 100%)`,
                            filter: 'blur(25px)',
                            transform: 'translateZ(-80px) scale(1.15)',
                          }}
                          animate={{
                            opacity: isActive ? [0.25, 0.45, 0.25] : 0.15,
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                        
                        {/* Card Container */}
                        <Box
                          className="relative"
                          sx={{
                            transformStyle: 'preserve-3d',
                            backfaceVisibility: 'hidden',
                          }}
                        >
                          <VideoCard
                            video={video}
                            isActive={isActive}
                            index={currentIndex + video.position}
                          />
                        </Box>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>

                {/* Navigation Arrows - Enhanced */}
                {videos.length > 1 && (
                  <>
                    <motion.div
                      className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-40"
                      whileHover={{ scale: 1.15, x: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton
                        onClick={prevVideo}
                        className="bg-white hover:bg-gray-50 shadow-2xl border-2 border-gray-200 rounded-full w-16 h-16"
                        sx={{
                          '&:hover': { 
                            backgroundColor: 'white',
                            borderColor: '#3b82f6',
                          },
                        }}
                      >
                        <motion.div
                          animate={{ x: [0, -4, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <ChevronLeft sx={{ fontSize: 28, color: '#1f2937' }} />
                        </motion.div>
                      </IconButton>
                    </motion.div>

                    <motion.div
                      className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-40"
                      whileHover={{ scale: 1.15, x: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton
                        onClick={nextVideo}
                        className="bg-white hover:bg-gray-50 shadow-2xl border-2 border-gray-200 rounded-full w-16 h-16"
                        sx={{
                          '&:hover': { 
                            backgroundColor: 'white',
                            borderColor: '#3b82f6',
                          },
                        }}
                      >
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <ChevronRight sx={{ fontSize: 28, color: '#1f2937' }} />
                        </motion.div>
                      </IconButton>
                    </motion.div>
                  </>
                )}

                {/* Enhanced Stack Indicator */}
                {videos.length > 1 && (
                  <Box className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-gray-200">
                    {videos.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentIndex 
                            ? 'bg-denim w-8' 
                            : 'bg-gray-300 hover:bg-gray-400 w-2'
                        }`}
                        animate={{
                          scale: index === currentIndex ? [1, 1.3, 1] : 1,
                        }}
                        transition={{
                          duration: 2,
                          repeat: index === currentIndex ? Infinity : 0,
                          ease: 'easeInOut',
                        }}
                        whileHover={{ scale: 1.5 }}
                        whileTap={{ scale: 0.8 }}
                      />
                    ))}
                  </Box>
                )}
              </Box>

              {/* Video Counter - Enhanced */}
              <motion.div
                className="text-center mt-10"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.2 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="inline-block"
                >
                  <Typography
                    variant="body1"
                    className="text-gray-600 font-medium"
                    sx={{ fontWeight: 500 }}
                  >
                    <span className="text-denim font-bold">{currentIndex + 1}</span>
                    {' / '}
                    <span className="text-gray-500">{videos.length}</span>
                  </Typography>
                </motion.div>
              </motion.div>
            </Box>
          )}

          {videos.length === 0 && (
            <Box className="text-center py-20">
              <Typography variant="h6" className="text-gray-400">
                No videos available yet
              </Typography>
            </Box>
          )}
        </motion.div>
      </Container>
    </Box>
  )
}

export default VideoGallery
