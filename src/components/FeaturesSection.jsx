import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Box, Typography, Container } from '@mui/material'
import { 
  ShoppingBag, 
  PlayCircleOutline, 
  AutoAwesome, 
  WhatsApp 
} from '@mui/icons-material'

const FeaturesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const features = [
    {
      title: 'Browse Collection',
      description: 'Explore our curated selection of premium denim pieces.',
      icon: ShoppingBag,
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: '#3b82f6',
    },
    {
      title: 'View Products',
      description: 'Watch detailed videos showcasing each piece.',
      icon: PlayCircleOutline,
      gradient: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)',
      color: '#9333ea',
    },
    {
      title: 'Get Styling Tips',
      description: 'Discover how to style our denim for any occasion.',
      icon: AutoAwesome,
      gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      color: '#ec4899',
    },
    {
      title: 'Contact Us',
      description: 'Reach out via WhatsApp for orders and inquiries.',
      icon: WhatsApp,
      gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      color: '#22c55e',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  }

  return (
    <Box ref={ref} className="py-20 md:py-28 bg-transparent relative overflow-hidden">
      {/* Decorative Background Elements */}
      <Box className="absolute top-0 left-0 w-96 h-96 bg-denim/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <Box className="absolute bottom-0 right-0 w-96 h-96 bg-denim/2 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <Container maxWidth="lg" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <Typography
              variant="overline"
              className="text-gray-400 uppercase tracking-[0.3em] text-xs font-medium inline-block px-4 py-2 bg-gray-50 rounded-full"
            >
              Features
            </Typography>
          </motion.div>

          <Typography
            variant="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            sx={{ 
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            How We{' '}
            <motion.span
              className="text-denim relative inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Transform Your Style
              <motion.span
                className="absolute bottom-2 left-0 right-0 h-3 bg-denim/20 -z-10"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.span>
          </Typography>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center"
          >
            <motion.div
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
                See how our premium denim collection elevates your wardrobe with quality and style.
              </Typography>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -12,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative group"
              >
                {/* Modern Card Design */}
                <motion.div
                  className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-full"
                  whileHover={{ 
                    borderColor: 'rgba(59, 130, 246, 0.2)',
                  }}
                >
                  {/* Animated Background Gradient on Hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                    style={{ background: feature.gradient }}
                    initial={false}
                  />

                  {/* Modern Icon Container */}
                  <motion.div
                    className="relative mb-6 flex items-center justify-center"
                    animate={{
                      scale: hoveredIndex === index ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box className="relative">
                      {/* Outer Glow Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 blur-2xl"
                        style={{ background: feature.gradient }}
                        animate={{
                          opacity: hoveredIndex === index ? [0, 0.3, 0] : 0,
                          scale: hoveredIndex === index ? [1, 1.3, 1] : 1,
                        }}
                        transition={{
                          duration: 2,
                          repeat: hoveredIndex === index ? Infinity : 0,
                          ease: 'easeInOut',
                        }}
                      />
                      
                      {/* Icon Container with Gradient Background */}
                      <motion.div
                        className="relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{ background: feature.gradient }}
                        animate={{
                          rotate: hoveredIndex === index ? [0, 5, -5, 0] : 0,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: 'easeInOut',
                        }}
                      >
                        {/* Icon with white color */}
                        <IconComponent 
                          sx={{ 
                            fontSize: 36,
                            color: 'white',
                          }}
                        />

                        {/* Shine Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl"
                          initial={{ x: '-100%' }}
                          animate={{
                            x: hoveredIndex === index ? '100%' : '-100%',
                          }}
                          transition={{
                            duration: 0.6,
                            ease: 'easeInOut',
                          }}
                          style={{
                            transform: 'skewX(-20deg)',
                          }}
                        />
                      </motion.div>

                      {/* Floating Particles on Hover */}
                      {hoveredIndex === index && (
                        <>
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 rounded-full"
                              style={{ background: feature.gradient }}
                              initial={{ 
                                opacity: 0, 
                                scale: 0,
                                x: '50%',
                                y: '50%',
                              }}
                              animate={{ 
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                                x: ['50%', `${50 + (i - 1) * 40}%`],
                                y: ['50%', `${50 - 40}%`],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeOut',
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </>
                      )}
                    </Box>
                  </motion.div>

                  {/* Title */}
                  <motion.div
                    initial={false}
                    animate={{
                      color: hoveredIndex === index ? '#3b82f6' : '#111827',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography
                      variant="h6"
                      className="font-bold mb-3 text-xl"
                      sx={{ fontWeight: 700 }}
                    >
                      {feature.title}
                    </Typography>
                  </motion.div>

                  {/* Description */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography
                      variant="body2"
                      className="text-gray-600 leading-relaxed text-sm"
                    >
                      {feature.description}
                    </Typography>
                  </motion.div>

                  {/* Modern Bottom Accent Line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{
                      background: hoveredIndex === index 
                        ? `linear-gradient(to right, transparent, ${feature.color}, transparent)`
                        : 'transparent',
                      transformOrigin: 'center',
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: hoveredIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex items-center justify-center gap-4 mt-16"
        >
          <Box className="w-16 h-0.5 bg-gradient-to-r from-transparent via-denim to-transparent" />
          <Box className="w-2 h-2 rounded-full bg-denim" />
          <Box className="w-16 h-0.5 bg-gradient-to-r from-transparent via-denim to-transparent" />
        </motion.div>
      </Container>
    </Box>
  )
}

export default FeaturesSection
