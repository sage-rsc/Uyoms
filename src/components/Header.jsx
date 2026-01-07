import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Typography, Box, Container } from '@mui/material'

const Header = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [isTitleHovered, setIsTitleHovered] = useState(false)

  return (
    <Box className="relative overflow-hidden bg-transparent">
      {/* Colorful Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
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

      {/* Hero Section */}
      <Container maxWidth="lg" className="relative py-20 md:py-32 z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-5xl mx-auto relative"
        >
          {/* Large Logo with Colorful Effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
            className="mb-12 flex justify-center"
            onHoverStart={() => setIsLogoHovered(true)}
            onHoverEnd={() => setIsLogoHovered(false)}
          >
            <Box className="relative">
              {/* Colorful Glow Rings */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  scale: isLogoHovered ? [1, 1.4, 1] : [1, 1.2, 1],
                  opacity: isLogoHovered ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.3))',
                  filter: 'blur(40px)',
                }}
              />
              
              {/* Logo with elegant frame */}
              <motion.div
                className="relative"
                animate={{
                  scale: isLogoHovered ? [1, 1.1, 1] : [1, 1.02, 1],
                  rotate: isLogoHovered ? [0, 5, -5, 0] : [0, 1, -1, 0],
                }}
                transition={{
                  duration: isLogoHovered ? 0.5 : 6,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
              >
                <Box className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto relative">
                  {/* Colorful Outer Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-xl"
                    animate={{
                      scale: isLogoHovered ? [1, 1.3, 1] : [1, 1.1, 1],
                      opacity: isLogoHovered ? [0.5, 0.8, 0.5] : [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: isLogoHovered ? 1.5 : 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.4))',
                    }}
                  />
                  
                  {/* Logo container with colorful border */}
                  <motion.div
                    className="relative w-full h-full rounded-full bg-white shadow-2xl border-4 p-4"
                    animate={{
                      borderColor: isLogoHovered 
                        ? ['rgba(59, 130, 246, 0.6)', 'rgba(147, 51, 234, 0.6)', 'rgba(59, 130, 246, 0.6)']
                        : ['rgba(59, 130, 246, 0.3)', 'rgba(147, 51, 234, 0.2)', 'rgba(59, 130, 246, 0.3)'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Box className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/50 to-white">
                      <motion.img
                        src={`${import.meta.env.BASE_URL}Uyo's.jpg`}
                        alt="Uyom's Denim & Co. Logo"
                        className="w-full h-full object-cover"
                        animate={{
                          scale: isLogoHovered ? [1, 1.05, 1] : [1, 1.01, 1],
                        }}
                        transition={{
                          duration: isLogoHovered ? 1 : 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        onError={(e) => {
                          if (e.target.src.includes("Uyo's.jpg")) {
                            e.target.src = `${import.meta.env.BASE_URL}oriakum.jpg`
                          } else if (e.target.src.includes("oriakum.jpg")) {
                            e.target.src = `${import.meta.env.BASE_URL}nkem.jpg`
                          }
                        }}
                      />
                    </Box>
                  </motion.div>

                  {/* Colorful Decorative Rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-4 rounded-full border-2 border-dashed"
                    style={{
                      borderColor: 'rgba(59, 130, 246, 0.3)',
                    }}
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-8 rounded-full border border-dotted"
                    style={{
                      borderColor: 'rgba(147, 51, 234, 0.2)',
                    }}
                  />
                </Box>
              </motion.div>

              {/* Colorful Floating Particles on Hover */}
              {isLogoHovered && (
                <>
                  {[...Array(6)].map((_, i) => {
                    const colors = [
                      'rgba(59, 130, 246, 0.6)',
                      'rgba(147, 51, 234, 0.6)',
                      'rgba(59, 130, 246, 0.5)',
                      'rgba(236, 72, 153, 0.5)',
                      'rgba(59, 130, 246, 0.4)',
                      'rgba(147, 51, 234, 0.4)',
                    ]
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: colors[i],
                          left: '50%',
                          top: '50%',
                        }}
                        initial={{ 
                          opacity: 0, 
                          scale: 0,
                        }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: ['50%', `${50 + (i - 2.5) * 35}%`],
                          y: ['50%', `${50 - 60}%`],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeOut',
                          delay: i * 0.15,
                        }}
                      />
                    )
                  })}
                </>
              )}

              {/* Floating elements around logo - Colorful */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  x: [0, 5, 0],
                  scale: isLogoHovered ? [1, 1.4, 1] : [1, 1.1, 1],
                }}
                transition={{ 
                  duration: isLogoHovered ? 2 : 4, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
                className="absolute -top-4 -right-4 w-6 h-6 rounded-full blur-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.4))',
                }}
              />
              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  x: [0, -5, 0],
                  scale: isLogoHovered ? [1, 1.5, 1] : [1, 1.2, 1],
                }}
                transition={{ 
                  duration: isLogoHovered ? 2.5 : 5, 
                  repeat: Infinity, 
                  ease: 'easeInOut', 
                  delay: 0.5 
                }}
                className="absolute -bottom-4 -left-4 w-4 h-4 rounded-full blur-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.4), rgba(59, 130, 246, 0.3))',
                }}
              />
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  x: [0, -8, 0],
                  opacity: isLogoHovered ? [0.6, 1, 0.6] : [0.4, 0.7, 0.4],
                }}
                transition={{ 
                  duration: isLogoHovered ? 2 : 3.5, 
                  repeat: Infinity, 
                  ease: 'easeInOut', 
                  delay: 1 
                }}
                className="absolute top-1/2 -right-8 w-3 h-3 rounded-full blur-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.5), rgba(59, 130, 246, 0.4))',
                }}
              />
            </Box>
          </motion.div>

          {/* Label - Colorful */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
            } : { 
              opacity: 0, 
              y: 20 
            }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                background: [
                  'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
                  'linear-gradient(135deg, rgba(147, 51, 234, 0.15), rgba(59, 130, 246, 0.15))',
                  'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="inline-block px-4 py-2 rounded-full"
            >
              <Typography
                variant="overline"
                className="text-gray-600 uppercase tracking-[0.3em] text-xs font-medium"
                sx={{
                  background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Gallery
              </Typography>
            </motion.div>
          </motion.div>
          
          {/* Main Heading - Colorful */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            onHoverStart={() => setIsTitleHovered(true)}
            onHoverEnd={() => setIsTitleHovered(false)}
            className="cursor-pointer"
          >
            <Typography
              variant="h1"
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-[1.1] tracking-tight"
              sx={{ 
                fontWeight: 800,
                letterSpacing: '-0.02em',
              }}
            >
              <motion.span
                animate={{
                  color: isTitleHovered ? '#3b82f6' : '#111827',
                  scale: isTitleHovered ? [1, 1.02, 1] : [1, 1.01, 1],
                }}
                transition={{
                  duration: isTitleHovered ? 0.3 : 4,
                  color: { duration: 0.3 },
                  scale: {
                    duration: isTitleHovered ? 0.5 : 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                }}
              >
                Uyom's Denim{' '}
              </motion.span>
              <motion.span
                className="relative inline-block"
                animate={{
                  scale: isTitleHovered ? [1, 1.05, 1] : [1, 1.01, 1],
                }}
                transition={{
                  duration: isTitleHovered ? 0.5 : 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #9333ea, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                & Co.
                <motion.span
                  className="absolute bottom-2 left-0 right-0 h-3 -z-10 rounded-full"
                  animate={{
                    scaleX: 1,
                    opacity: isTitleHovered ? [0.6, 0.9, 0.6] : [0.4, 0.6, 0.4],
                    background: [
                      'linear-gradient(90deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
                      'linear-gradient(90deg, rgba(147, 51, 234, 0.4), rgba(236, 72, 153, 0.4))',
                      'linear-gradient(90deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
                    ],
                  }}
                  transition={{
                    opacity: {
                      duration: isTitleHovered ? 1.5 : 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                    background: {
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                  }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.span>
            </Typography>

            {/* Colorful Floating Particles on Title Hover */}
            {isTitleHovered && (
              <>
                {[...Array(7)].map((_, i) => {
                  const colors = [
                    'rgba(59, 130, 246, 0.6)',
                    'rgba(147, 51, 234, 0.6)',
                    'rgba(236, 72, 153, 0.5)',
                    'rgba(59, 130, 246, 0.5)',
                    'rgba(147, 51, 234, 0.4)',
                    'rgba(236, 72, 153, 0.4)',
                    'rgba(59, 130, 246, 0.4)',
                  ]
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: colors[i],
                        left: '50%',
                        top: '50%',
                      }}
                      initial={{ 
                        opacity: 0, 
                        scale: 0,
                      }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        y: [0, -40 - i * 8],
                        x: [0, (i - 3) * 25],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeOut',
                        delay: i * 0.1,
                      }}
                    />
                  )
                })}
              </>
            )}
          </motion.div>
          
          {/* Subtitle - Colorful Accent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
            } : { 
              opacity: 0, 
              y: 20 
            }}
            transition={{ duration: 0.8, delay: 0.7 }}
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
            >
              <Typography
                variant="h5"
                className="text-xl md:text-2xl mb-12 leading-relaxed font-light max-w-2xl mx-auto"
                sx={{ 
                  fontWeight: 300,
                  background: 'linear-gradient(135deg, #4b5563, #3b82f6, #9333ea)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Crafted to compliment you
              </Typography>
            </motion.div>
          </motion.div>

          {/* Colorful Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { 
              opacity: 1, 
              scaleX: 1 
            } : { 
              opacity: 0, 
              scaleX: 0 
            }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center justify-center gap-4"
          >
            <motion.div
              className="w-16 h-0.5 rounded-full"
              animate={{
                scaleX: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
                background: [
                  'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.6), transparent)',
                  'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.6), transparent)',
                  'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.6), transparent)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                background: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              }}
            />
            <motion.div
              className="w-3 h-3 rounded-full"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.7, 1, 0.7],
                background: [
                  'linear-gradient(135deg, #3b82f6, #9333ea)',
                  'linear-gradient(135deg, #9333ea, #ec4899)',
                  'linear-gradient(135deg, #3b82f6, #9333ea)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.3,
                background: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              }}
            />
            <motion.div
              className="w-16 h-0.5 rounded-full"
              animate={{
                scaleX: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
                background: [
                  'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.6), transparent)',
                  'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.6), transparent)',
                  'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.6), transparent)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.6,
                background: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              }}
            />
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  )
}

export default Header
