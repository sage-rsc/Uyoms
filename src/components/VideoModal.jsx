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

      setTimeout(() => {
        if (videoRef.current && (!isGoogleDrive || useDirectUrl)) {
          videoRef.current.play().catch(() => {
            setNeedsPlay(true)
          })
        } else if (iframeRef.current && isGoogleDrive && !useDirectUrl) {
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
      }, 500)

      return () => clearTimeout(checkAccess)
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
  const maxHeight = isMobile ? '95vh' : '90vh'

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
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          className="absolute top-3 right-3 z-30 bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg"
          sx={{
            width: 36,
            height: 36,
          }}
        >
          <Close fontSize="small" />
        </IconButton>

        {/* Video Container */}
        <Box 
          className="relative w-full bg-black flex-shrink-0"
          sx={{
            aspectRatio: '9/16',
            maxHeight: isMobile ? '70vh' : '600px',
            minHeight: '300px',
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
                        setTimeout(() => {
                          try {
                            if (iframeRef.current?.contentWindow) {
                              iframeRef.current.contentWindow.postMessage(
                                JSON.stringify({
                                  event: 'command',
                                  func: 'playVideo',
                                  args: ''
                                }),
                                '*'
                              )
                            }
                          } catch (e) {
                            console.log('Could not trigger play')
                          }
                        }, 1000)
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

          {/* Loading Indicator */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/70 z-20"
              >
                <CircularProgress size={48} sx={{ color: 'white' }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Play Button (if needed) */}
          <AnimatePresence>
            {needsPlay && !isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center bg-black/50 z-20"
              >
                <IconButton
                  onClick={handlePlayClick}
                  className="bg-white/90 hover:bg-white w-20 h-20"
                >
                  <PlayArrow className="text-denim text-4xl ml-1" />
                </IconButton>
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

        {/* Video Info */}
        <Box className="p-4 md:p-6 bg-white flex-shrink-0">
          <Typography
            variant="h6"
            className="font-bold text-gray-900 mb-2"
            sx={{ fontWeight: 700, fontSize: isMobile ? '1rem' : '1.25rem' }}
          >
            {video.title}
          </Typography>
          <Typography
            variant="body2"
            className="text-gray-600 mb-4 text-sm"
          >
            {video.description}
          </Typography>

          {/* WhatsApp Button */}
          <Button
            variant="contained"
            fullWidth
            startIcon={<WhatsApp />}
            onClick={handleWhatsAppClick}
            className="bg-[#25D366] hover:bg-[#20BA5A] text-white"
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              py: 1.25,
              fontWeight: 600,
              fontSize: isMobile ? '0.875rem' : '1rem',
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
