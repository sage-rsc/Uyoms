import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactPlayer from 'react-player'
import { 
  Dialog,
  IconButton,
  Box,
  Typography,
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Close, VolumeOff, VolumeUp, WhatsApp, PlayArrow, OpenInNew, ErrorOutline } from '@mui/icons-material'
import { WHATSAPP_NUMBER } from '../config/whatsapp'

const VideoModal = ({ open, onClose, video }) => {
  const [isMuted, setIsMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [hasAccessError, setHasAccessError] = useState(false)
  const [needsPlay, setNeedsPlay] = useState(false)
  const [useDirectUrl, setUseDirectUrl] = useState(false)
  const videoRef = useRef(null)
  const iframeRef = useRef(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const getVideoUrl = (url) => {
    if (!url) return ''
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (match) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`
    }
    return url
  }

  const getGoogleDriveEmbedUrl = (url) => {
    if (!url) return ''
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (match) {
      const fileId = match[1]
      // Use preview endpoint for better embedding support
      return `https://drive.google.com/file/d/${fileId}/preview`
    }
    return url
  }

  const getGoogleDriveDirectUrl = (url) => {
    if (!url) return ''
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (match) {
      const fileId = match[1]
      // Alternative direct streaming URL
      return `https://drive.google.com/uc?export=download&id=${fileId}`
    }
    return url
  }

  const videoUrl = getVideoUrl(video?.videoUrl)
  const embedUrl = getGoogleDriveEmbedUrl(video?.videoUrl)
  const directUrl = getGoogleDriveDirectUrl(video?.videoUrl)
  const isGoogleDrive = video?.videoUrl?.includes('drive.google.com')

  useEffect(() => {
    if (open && video) {
      setIsLoading(true)
      setIsMuted(true)
      setHasError(false)
      setHasAccessError(false)
      setNeedsPlay(false)
      setUseDirectUrl(false)
      
      // Check for access error after iframe loads
      const checkAccess = setTimeout(() => {
        if (iframeRef.current && isGoogleDrive && !useDirectUrl) {
          try {
            // Try to detect access error by checking iframe content
            const iframe = iframeRef.current
            if (iframe.contentDocument) {
              const bodyText = iframe.contentDocument.body?.innerText || ''
              if (bodyText.includes('You need access') || bodyText.includes('Access denied')) {
                setHasAccessError(true)
                setIsLoading(false)
                // Fallback to direct URL
                setUseDirectUrl(true)
              }
            }
          } catch (e) {
            // Cross-origin, can't check - will rely on onError
          }
        }
      }, 2000)

      // Try to play video immediately when modal opens
      const playTimeout = setTimeout(() => {
        if (videoRef.current && (!isGoogleDrive || useDirectUrl)) {
          // For direct video, try to play immediately
          const playPromise = videoRef.current.play()
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                // Autoplay succeeded
                setNeedsPlay(false)
                setIsLoading(false)
              })
              .catch(() => {
                // Autoplay failed - user interaction required
                // Don't show overlay, let user click the video controls
                setNeedsPlay(false)
                setIsLoading(false)
              })
          }
        } else if (iframeRef.current && isGoogleDrive && !useDirectUrl) {
          // For Google Drive iframe, try to trigger play
          try {
            iframeRef.current.contentWindow?.postMessage(
              JSON.stringify({
                event: 'command',
                func: 'playVideo',
                args: ''
              }),
              '*'
            )
          } catch (e) {
            console.log('Could not autoplay iframe')
          }
        }
      }, 300)

      return () => {
        clearTimeout(checkAccess)
        clearTimeout(playTimeout)
      }
    }
  }, [open, video, isGoogleDrive, useDirectUrl])

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setNeedsPlay(false)
    }
  }

  const getWhatsAppLink = () => {
    if (!video) return ''
    const videoLink = `${window.location.origin}${window.location.pathname}?video=${video.id}`
    const message = encodeURIComponent(
      `Hi! I'm interested in: ${video.title}\n\nView: ${videoLink}`
    )
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
  }

  const handleWhatsAppClick = () => {
    window.open(getWhatsAppLink(), '_blank')
  }

  if (!video) return null

  // Calculate max width based on screen size
  const maxWidth = isMobile ? '95vw' : isTablet ? '90vw' : '420px'
  // Reserve space for the info section (title, description, button) - approximately 180px
  const infoSectionHeight = isMobile ? 180 : 200
  const maxHeight = isMobile ? `calc(95vh - 20px)` : '90vh'

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth={false}
      PaperProps={{
        className: 'bg-transparent shadow-none m-2',
        sx: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          maxWidth: maxWidth,
          width: '100%',
          margin: '8px',
        }
      }}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(10px)',
        },
        '& .MuiDialog-container': {
          alignItems: 'center',
          justifyContent: 'center',
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white rounded-2xl overflow-hidden shadow-2xl w-full"
        style={{
          maxHeight: maxHeight,
          display: 'flex',
          flexDirection: 'column',
          // Ensure proper overflow handling
          overflow: 'hidden',
        }}
      >
        {/* Close Button - Highly Visible */}
        <motion.div
          className="absolute top-4 right-4 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Pulsing ring for visibility */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/30"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
          <IconButton
            onClick={onClose}
            className="relative bg-white hover:bg-gray-100 shadow-2xl border-2 border-gray-300"
            sx={{
              width: { xs: 48, sm: 52 },
              height: { xs: 48, sm: 52 },
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: '#f3f4f6',
                transform: 'scale(1.1)',
                borderColor: '#3b82f6',
              },
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.5)',
            }}
            aria-label="Close video modal"
          >
            <Close 
              sx={{ 
                fontSize: { xs: 28, sm: 32 },
                color: '#1f2937',
                fontWeight: 'bold',
              }} 
            />
          </IconButton>
        </motion.div>

        {/* Video Container */}
        <Box 
          className="relative w-full bg-black flex-shrink-0 overflow-hidden"
          sx={{
            aspectRatio: '9/16',
            // Ensure video doesn't take up too much space, leaving room for button
            maxHeight: isMobile ? `calc(95vh - ${infoSectionHeight}px)` : '600px',
            minHeight: '300px',
            // Make it scrollable if content is too tall
            overflowY: 'auto',
            // Prevent horizontal scroll
            overflowX: 'hidden',
          }}
        >
          {videoUrl && (
            <>
              {isGoogleDrive ? (
                <>
                  {!useDirectUrl ? (
                    <iframe
                      ref={iframeRef}
                      src={embedUrl}
                      className="absolute inset-0 w-full h-full border-none"
                      allow="autoplay; encrypted-media; fullscreen"
                      allowFullScreen
                      onLoad={() => {
                        setIsLoading(false)
                        // Try to play immediately when iframe loads
                        setTimeout(() => {
                          try {
                            if (iframeRef.current?.contentWindow) {
                              // Try multiple times to ensure it plays
                              const tryPlay = () => {
                                iframeRef.current.contentWindow.postMessage(
                                  JSON.stringify({
                                    event: 'command',
                                    func: 'playVideo',
                                    args: ''
                                  }),
                                  '*'
                                )
                              }
                              tryPlay()
                              setTimeout(tryPlay, 500)
                              setTimeout(tryPlay, 1000)
                            }
                          } catch (e) {
                            console.log('Could not trigger play')
                          }
                        }, 500)
                      }}
                      onError={() => {
                        setHasError(true)
                        setHasAccessError(true)
                        setIsLoading(false)
                        setUseDirectUrl(true)
                      }}
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      src={directUrl}
                      autoPlay
                      muted={isMuted}
                      loop
                      playsInline
                      controls
                      className="absolute inset-0 w-full h-full object-cover"
                      onLoadedData={() => {
                        setIsLoading(false)
                        setHasError(false)
                        setHasAccessError(false)
                        setNeedsPlay(false)
                        // Try to play immediately
                        if (videoRef.current) {
                          videoRef.current.play().catch(() => {
                            // Autoplay failed, but don't show overlay - let user use controls
                            setNeedsPlay(false)
                          })
                        }
                      }}
                      onPlay={() => {
                        // Video started playing
                        setIsLoading(false)
                        setNeedsPlay(false)
                      }}
                      onError={() => {
                        setHasError(true)
                        setHasAccessError(true)
                        setIsLoading(false)
                      }}
                    />
                  )}
                  {hasAccessError && !useDirectUrl && (
                    <Box className="absolute inset-0 flex items-center justify-center bg-black/90 z-30 p-4">
                      <Box className="text-center text-white">
                        <ErrorOutline sx={{ fontSize: 48, mb: 2, color: 'white' }} />
                        <Typography variant="h6" className="text-white mb-2" sx={{ fontWeight: 600 }}>
                          Access Required
                        </Typography>
                        <Typography variant="body2" className="text-white/80 mb-4">
                          This video needs to be shared publicly on Google Drive.
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<OpenInNew />}
                          onClick={() => window.open(video?.videoUrl, '_blank')}
                          className="bg-denim hover:bg-denim/90 text-white"
                          sx={{ textTransform: 'none', borderRadius: '8px' }}
                        >
                          Open in Google Drive
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setUseDirectUrl(true)}
                          className="mt-2 text-white border-white hover:bg-white/10"
                          sx={{ textTransform: 'none', borderRadius: '8px', display: 'block', mx: 'auto' }}
                        >
                          Try Direct Link
                        </Button>
                      </Box>
                    </Box>
                  )}
                </>
              ) : (
                <ReactPlayer
                  url={videoUrl}
                  playing={true}
                  muted={isMuted}
                  loop
                  controls
                  width="100%"
                  height="100%"
                  onReady={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false)
                    setHasError(true)
                  }}
                  config={{
                    file: {
                      attributes: {
                        playsInline: true,
                        autoPlay: true,
                      },
                    },
                  }}
                  className="absolute inset-0"
                />
              )}
            </>
          )}

          {/* Loading Indicator - Only show briefly */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/70 z-20 pointer-events-none"
                transition={{ duration: 0.3 }}
              >
                <CircularProgress size={48} sx={{ color: 'white' }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mute Button */}
          {!isGoogleDrive && !hasError && !isLoading && (
            <IconButton
              onClick={() => setIsMuted(!isMuted)}
              className="absolute top-3 left-3 z-20 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white"
              sx={{ width: 36, height: 36 }}
            >
              {isMuted ? <VolumeOff fontSize="small" /> : <VolumeUp fontSize="small" />}
            </IconButton>
          )}
        </Box>

        {/* Video Info - Always visible at bottom */}
        <Box 
          className="p-4 md:p-6 bg-white flex-shrink-0"
          sx={{
            // Ensure this section is always visible
            position: 'relative',
            zIndex: 10,
            // Prevent shrinking
            flexShrink: 0,
            // Add border for visual separation
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h6"
            className="font-bold text-gray-900 mb-2"
            sx={{ 
              fontWeight: 700, 
              fontSize: isMobile ? '1rem' : '1.25rem',
              // Limit title to 2 lines on mobile
              display: '-webkit-box',
              WebkitLineClamp: isMobile ? 2 : 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {video.title}
          </Typography>
          {video.description && (
            <Typography
              variant="body2"
              className="text-gray-600 mb-4 text-sm"
              sx={{
                // Limit description to 2 lines on mobile
                display: '-webkit-box',
                WebkitLineClamp: isMobile ? 2 : 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {video.description}
            </Typography>
          )}

          {/* WhatsApp Button - Always visible */}
          <Button
            variant="contained"
            fullWidth
            startIcon={<WhatsApp />}
            onClick={handleWhatsAppClick}
            className="bg-[#25D366] hover:bg-[#20BA5A] text-white"
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              py: isMobile ? 1.5 : 1.25,
              fontWeight: 600,
              fontSize: isMobile ? '0.875rem' : '1rem',
              // Ensure button is always clickable
              position: 'relative',
              zIndex: 10,
              '&:hover': {
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
              }
            }}
          >
            Contact via WhatsApp
          </Button>
        </Box>
      </motion.div>
    </Dialog>
  )
}

export default VideoModal
