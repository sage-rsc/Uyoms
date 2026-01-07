import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  IconButton,
  Alert,
  Snackbar,
  Paper,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from '@mui/material'
import {
  Delete,
  Add,
  Save,
  ArrowBack,
  Visibility,
  VisibilityOff,
  Edit,
  VideoLibrary,
  Lock,
} from '@mui/icons-material'
import { getVideos, addVideo, removeVideo, updateVideo, checkAdminPassword } from '../utils/storage'

function Admin() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [videos, setVideos] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingVideo, setEditingVideo] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' })
  const [deleteDialog, setDeleteDialog] = useState({ open: false, videoId: null, videoTitle: '' })
  const loginRef = useRef(null)
  const isLoginInView = useInView(loginRef, { once: true })

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    posterUrl: '',
  })

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadVideos()
    }
  }, [])

  const loadVideos = () => {
    setVideos(getVideos())
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (checkAdminPassword(password)) {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_authenticated', 'true')
      loadVideos()
      showNotification('Login successful!', 'success')
    } else {
      showNotification('Incorrect password!', 'error')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_authenticated')
    setPassword('')
    showNotification('Logged out successfully', 'success')
  }

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity })
  }

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false })
  }

  const handleAddVideo = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.videoUrl) {
      showNotification('Please fill in title and video URL', 'error')
      return
    }

    addVideo(formData)
    loadVideos()
    setFormData({ title: '', description: '', videoUrl: '', posterUrl: '' })
    setShowAddForm(false)
    showNotification('Video added successfully!', 'success')
    window.dispatchEvent(new Event('videosUpdated'))
  }

  const handleDeleteClick = (video) => {
    setDeleteDialog({ open: true, videoId: video.id, videoTitle: video.title })
  }

  const handleDeleteConfirm = () => {
    if (deleteDialog.videoId) {
      removeVideo(deleteDialog.videoId)
      loadVideos()
      showNotification('Video deleted successfully!', 'success')
      window.dispatchEvent(new Event('videosUpdated'))
    }
    setDeleteDialog({ open: false, videoId: null, videoTitle: '' })
  }

  const handleEditVideo = (video) => {
    setEditingVideo(video)
    setFormData({
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      posterUrl: video.posterUrl || '',
    })
    setShowAddForm(true)
  }

  const handleUpdateVideo = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.videoUrl) {
      showNotification('Please fill in title and video URL', 'error')
      return
    }

    updateVideo(editingVideo.id, formData)
    loadVideos()
    setFormData({ title: '', description: '', videoUrl: '', posterUrl: '' })
    setEditingVideo(null)
    setShowAddForm(false)
    showNotification('Video updated successfully!', 'success')
    window.dispatchEvent(new Event('videosUpdated'))
  }

  const cancelForm = () => {
    setFormData({ title: '', description: '', videoUrl: '', posterUrl: '' })
    setEditingVideo(null)
    setShowAddForm(false)
  }

  if (!isAuthenticated) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-denim/10 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Colorful Background Elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
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
        </motion.div>

        <motion.div
          ref={loginRef}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isLoginInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10"
        >
          <Paper
            elevation={0}
            className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full border border-gray-100 shadow-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoginInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-8"
            >
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-denim to-blue-600 flex items-center justify-center mx-auto mb-4"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Lock sx={{ fontSize: 32, color: 'white' }} />
              </motion.div>
              <Typography variant="h4" className="text-gray-900 mb-2 font-bold" sx={{ fontWeight: 700 }}>
                Admin Login
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Enter password to access admin panel
              </Typography>
            </motion.div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <TextField
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        className="text-gray-400"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: '#e5e7eb',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                      borderWidth: 2,
                    },
                  },
                }}
              />
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="bg-denim hover:bg-blue-700 text-white py-3 font-semibold rounded-xl"
                  sx={{ 
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
                    }
                  }}
                >
                  Login
                </Button>
              </motion.div>
            </form>

            <Typography variant="caption" className="text-gray-400 mt-6 block text-center">
              Default password: admin123
            </Typography>
          </Paper>
        </motion.div>
      </Box>
    )
  }

  return (
    <Box className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-denim/10 p-4 md:p-8 relative overflow-hidden">
      {/* Colorful Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
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
      </motion.div>
      
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          variant="filled"
          sx={{
            borderRadius: '12px',
            fontWeight: 500,
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Container maxWidth="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100"
        >
          <Box className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <Box>
              <Typography variant="h4" className="font-bold mb-2 text-gray-900" sx={{ fontWeight: 700 }}>
                Admin Panel
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Manage your video gallery
              </Typography>
            </Box>
            <Box className="flex gap-3">
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate('/')}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                Back to Gallery
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
                className="border-red-300 text-red-600 hover:bg-red-50 rounded-xl"
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </motion.div>

        {/* Add Video Button */}
        <AnimatePresence>
          {!showAddForm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setShowAddForm(true)}
                  className="bg-denim hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg"
                  sx={{ 
                    textTransform: 'none', 
                    py: 1.5,
                    px: 3,
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
                    }
                  }}
                >
                  Add New Video
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add/Edit Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Paper
                elevation={0}
                className="mb-8 bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm"
              >
                <Box className="flex items-center gap-3 mb-6">
                  <Box className="w-12 h-12 rounded-xl bg-gradient-to-br from-denim to-blue-600 flex items-center justify-center">
                    <VideoLibrary sx={{ fontSize: 24, color: 'white' }} />
                  </Box>
                  <Typography variant="h5" className="text-gray-900 font-bold" sx={{ fontWeight: 700 }}>
                    {editingVideo ? 'Edit Video' : 'Add New Video'}
                  </Typography>
                </Box>
                <form onSubmit={editingVideo ? handleUpdateVideo : handleAddVideo} className="space-y-4">
                  <TextField
                    label="Product Name"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Denim Jacket - Classic Blue"
                    fullWidth
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '& fieldset': {
                          borderColor: '#e5e7eb',
                        },
                        '&:hover fieldset': {
                          borderColor: '#3b82f6',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Product description..."
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '& fieldset': {
                          borderColor: '#e5e7eb',
                        },
                        '&:hover fieldset': {
                          borderColor: '#3b82f6',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Video URL (Google Drive)"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://drive.google.com/file/d/FILE_ID/preview"
                    fullWidth
                    required
                    variant="outlined"
                    helperText="Format: https://drive.google.com/file/d/FILE_ID/preview"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '& fieldset': {
                          borderColor: '#e5e7eb',
                        },
                        '&:hover fieldset': {
                          borderColor: '#3b82f6',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Poster Image URL (Optional)"
                    value={formData.posterUrl}
                    onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
                    placeholder="https://example.com/poster.jpg"
                    fullWidth
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '& fieldset': {
                          borderColor: '#e5e7eb',
                        },
                        '&:hover fieldset': {
                          borderColor: '#3b82f6',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                  <Box className="flex gap-3 pt-2">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<Save />}
                        fullWidth
                        className="bg-denim hover:bg-blue-700 text-white font-semibold rounded-xl"
                        sx={{ 
                          textTransform: 'none', 
                          py: 1.5,
                          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                          '&:hover': {
                            boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
                          }
                        }}
                      >
                        {editingVideo ? 'Update Video' : 'Add Video'}
                      </Button>
                    </motion.div>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={cancelForm}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
                      sx={{ textTransform: 'none', fontWeight: 500, px: 3 }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </form>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Videos List */}
        <Box>
          <Box className="flex items-center gap-3 mb-6">
            <Typography variant="h5" className="text-gray-900 font-bold" sx={{ fontWeight: 700 }}>
              Videos
            </Typography>
            <Chip 
              label={videos.length} 
              className="bg-denim text-white"
              sx={{ fontWeight: 600 }}
              size="small"
            />
          </Box>
          {videos.length === 0 ? (
            <Paper
              elevation={0}
              className="text-center py-16 bg-white border border-gray-100 rounded-2xl"
            >
              <VideoLibrary sx={{ fontSize: 64, color: '#d1d5db', mb: 2 }} />
              <Typography variant="body1" className="text-gray-500 font-medium">
                No videos yet. Add your first video!
              </Typography>
            </Paper>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ y: -4 }}
                >
                  <Card
                    className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                    sx={{
                      '&:hover': {
                        borderColor: '#3b82f6',
                      }
                    }}
                  >
                    <CardContent className="p-6">
                      <Typography variant="h6" className="font-bold mb-2 text-gray-900 line-clamp-1" sx={{ fontWeight: 700 }}>
                        {video.title}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 mb-4 line-clamp-2">
                        {video.description || 'No description'}
                      </Typography>
                      <Divider className="my-4 bg-gray-100" />
                      <Box className="flex gap-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Edit />}
                            onClick={() => handleEditVideo(video)}
                            className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
                            fullWidth
                            sx={{ textTransform: 'none', fontWeight: 500 }}
                          >
                            Edit
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<Delete />}
                            onClick={() => handleDeleteClick(video)}
                            className="border-red-300 text-red-600 hover:bg-red-50 rounded-lg"
                            fullWidth
                            sx={{ textTransform: 'none', fontWeight: 500 }}
                          >
                            Delete
                          </Button>
                        </motion.div>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>
          )}
        </Box>
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, videoId: null, videoTitle: '' })}
        PaperProps={{
          className: 'bg-white rounded-2xl',
          sx: {
            borderRadius: '16px',
          }
        }}
      >
        <DialogTitle className="text-gray-900 font-bold" sx={{ fontWeight: 700 }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography className="text-gray-600">
            Are you sure you want to delete <strong>"{deleteDialog.videoTitle}"</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions className="p-4 gap-2">
          <Button
            onClick={() => setDeleteDialog({ open: false, videoId: null, videoTitle: '' })}
            className="text-gray-600 rounded-lg"
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Cancel
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              color="error"
              className="bg-red-500 hover:bg-red-600 rounded-lg"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Delete
            </Button>
          </motion.div>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Admin
