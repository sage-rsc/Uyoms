import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Card, 
  Typography, 
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { PlayArrow } from '@mui/icons-material'
import VideoModal from './VideoModal'

const VideoCard = ({ video, isActive, index, loadInstantly = false }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [thumbnailUrl, setThumbnailUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { threshold: 0.1, once: true })
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const getVideoUrl = (url) => {
    if (!url) return ''
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (match) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`
    }
    return url
  }

  const getThumbnailUrl = (url) => {
    if (!url) return ''
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (match) {
      const fileId = match[1]
      // Try multiple thumbnail sizes for better compatibility
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
    }
    return null
  }

  const videoUrl = getVideoUrl(video.videoUrl)
  const thumbUrl = getThumbnailUrl(video.videoUrl)

  // Load thumbnail instantly or when in view
  useEffect(() => {
    // Always show placeholder, load thumbnail if available
    if (loadInstantly || isInView) {
      setIsLoading(true)
      setLoadError(false)
      
      if (thumbUrl) {
        const img = new Image()
        img.onload = () => {
          setThumbnailUrl(thumbUrl)
          setIsLoading(false)
          setLoadError(false)
        }
        img.onerror = () => {
          // Try alternative thumbnail URL
          const match = video.videoUrl?.match(/\/d\/([a-zA-Z0-9_-]+)/)
          if (match) {
            const fileId = match[1]
            const altThumbUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`
            const altImg = new Image()
            altImg.onload = () => {
              setThumbnailUrl(altThumbUrl)
              setIsLoading(false)
              setLoadError(false)
            }
            altImg.onerror = () => {
              setThumbnailUrl(null)
              setIsLoading(false)
              setLoadError(true)
            }
            altImg.src = altThumbUrl
          } else {
            setThumbnailUrl(null)
            setIsLoading(false)
            setLoadError(true)
          }
        }
        img.src = thumbUrl
      } else if (video.posterUrl) {
        const img = new Image()
        img.onload = () => {
          setThumbnailUrl(video.posterUrl)
          setIsLoading(false)
          setLoadError(false)
        }
        img.onerror = () => {
          setThumbnailUrl(null)
          setIsLoading(false)
          setLoadError(true)
        }
        img.src = video.posterUrl
      } else {
        // No thumbnail URL, but still show placeholder
        setIsLoading(false)
        setLoadError(false) // Don't treat as error, just show placeholder
      }
    } else {
      // Not in view yet, but still show placeholder
      setIsLoading(false)
      setLoadError(false)
    }
  }, [thumbUrl, video.posterUrl, video.videoUrl, isInView, loadInstantly])

  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: 1,
        }}
        transition={{ 
          delay: index * 0.05, 
          duration: 0.5,
          type: 'spring',
          stiffness: 100,
        }}
        whileHover={!isMobile ? { 
          y: -12,
          transition: { duration: 0.3, ease: 'easeOut' }
        } : undefined}
        whileTap={{ scale: 0.98 }}
        className="relative cursor-pointer h-full"
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setTimeout(() => setIsHovered(false), 300)}
        onClick={handleCardClick}
      >
        <Card
          className="overflow-hidden bg-white shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-500 h-full"
          sx={{
            borderRadius: '16px',
            transition: 'all 0.3s ease',
            minHeight: '400px',
          }}
        >
          {/* Video Preview Container */}
          <Box 
            className="relative w-full aspect-[9/16] overflow-hidden"
            sx={{
              minHeight: isMobile ? '300px' : '400px',
              // Improve performance on mobile
              willChange: 'auto',
            }}
          >
            {/* Modern Placeholder - Always visible as base */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-denim/10 via-blue-50/20 to-purple-50/10"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{
                backgroundSize: '200% 200%',
                backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.08) 50%, rgba(59, 130, 246, 0.1) 100%)',
              }}
            >
              {/* Animated Grid Pattern */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                }}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Center Icon/Content */}
              <Box className="absolute inset-0 flex flex-col items-center justify-center p-6">
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="w-20 h-20 rounded-2xl bg-gradient-to-br from-denim/20 to-blue-400/20 flex items-center justify-center mb-4 shadow-lg"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <PlayArrow className="text-denim text-4xl" />
                      </motion.div>
                    </motion.div>
                    <motion.div
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Typography
                        variant="caption"
                        className="text-denim/70 font-medium text-xs uppercase tracking-wider"
                      >
                        Loading...
                      </Typography>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="w-20 h-20 rounded-2xl bg-gradient-to-br from-denim/15 to-blue-400/15 flex items-center justify-center mb-4 shadow-md border-2 border-denim/20"
                    >
                      <PlayArrow className="text-denim/60 text-4xl" />
                    </motion.div>
                    <Typography
                      variant="caption"
                      className="text-denim/60 font-medium text-xs uppercase tracking-wider text-center"
                    >
                      {video.title || 'Video Preview'}
                    </Typography>
                  </>
                )}
              </Box>
              
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatDelay: 1,
                }}
                style={{
                  transform: 'skewX(-20deg)',
                }}
              />
            </motion.div>

            {/* Thumbnail/Preview - Overlay on placeholder */}
            {thumbnailUrl && !isLoading && (
              <motion.img
                src={thumbnailUrl}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover z-10"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  scale: isHovered ? 1.1 : [1, 1.01, 1],
                  filter: isHovered ? 'brightness(0.9)' : 'brightness(1)',
                }}
                transition={{ 
                  opacity: { duration: 0.3 },
                  duration: isHovered ? 0.5 : 4,
                  ease: 'easeOut',
                  repeat: isHovered ? 0 : Infinity,
                }}
                loading="lazy"
                onError={() => {
                  setThumbnailUrl(null)
                  setLoadError(true)
                }}
              />
            )}

            {/* Animated Overlay - Continuously Subtle */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
              animate={{
                opacity: isHovered ? 0.7 : [0.4, 0.45, 0.4],
              }}
              transition={{ 
                duration: isHovered ? 0.3 : 3,
                repeat: isHovered ? 0 : Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Play Button Overlay - Continuously Pulsing */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={false}
              animate={{
                opacity: isHovered ? 1 : [0.9, 1, 0.9],
                scale: isHovered ? 1.1 : [1, 1.02, 1],
              }}
              transition={{ 
                duration: isHovered ? 0.3 : 2,
                ease: 'easeOut',
                repeat: isHovered ? 0 : Infinity,
              }}
            >
              <motion.div
                className="relative"
                animate={{
                  scale: isHovered ? [1, 1.15, 1] : [1, 1.05, 1],
                }}
                transition={{
                  duration: isHovered ? 1.5 : 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Pulsing Ring - Always Active */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/30"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
                
                {/* Play Button */}
                <Box className="relative w-20 h-20 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl border-2 border-white/50">
                  <motion.div
                    animate={{
                      x: isHovered ? [0, 3, 0] : [0, 1, 0],
                    }}
                    transition={{
                      duration: isHovered ? 0.5 : 2,
                      ease: 'easeInOut',
                      repeat: Infinity,
                    }}
                  >
                    <PlayArrow className="text-denim text-4xl ml-1" />
                  </motion.div>
                </Box>
              </motion.div>
            </motion.div>

            {/* Gradient Overlay at Bottom */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
              animate={{
                opacity: isHovered ? 0.9 : [0.7, 0.75, 0.7],
              }}
              transition={{ 
                duration: isHovered ? 0.3 : 3,
                repeat: isHovered ? 0 : Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Shine Effect - Continuously Moving */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 1,
              }}
              style={{
                transform: 'skewX(-20deg)',
              }}
            />
          </Box>

          {/* Title Overlay */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-5 z-10"
            animate={{
              y: isHovered ? -5 : [0, -2, 0],
            }}
            transition={{ 
              duration: isHovered ? 0.3 : 3,
              repeat: isHovered ? 0 : Infinity,
              ease: 'easeInOut',
            }}
          >
            <Typography
              variant="subtitle1"
              className="font-bold text-white text-base drop-shadow-lg"
              sx={{ fontWeight: 700 }}
            >
              {video.title}
            </Typography>
            {video.description && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  height: isHovered ? 'auto' : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <Typography
                  variant="caption"
                  className="text-white/90 text-xs mt-1 block"
                >
                  {video.description}
                </Typography>
              </motion.div>
            )}
          </motion.div>
        </Card>
      </motion.div>

      {/* Video Modal */}
      <VideoModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        video={video}
      />
    </>
  )
}

export default VideoCard
