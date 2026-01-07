import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Typography, Box, Container } from '@mui/material'

const Footer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-transparent border-t border-gray-200/50 py-12 relative overflow-hidden"
    >
      {/* Decorative Background - Continuously Animated */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.div
          className="absolute bottom-0 left-1/4 w-64 h-64 bg-denim/5 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-48 h-48 bg-denim/3 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
      </motion.div>

      <Container maxWidth="lg" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <motion.div
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-denim"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 1, 0.5],
                x: [0, 3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              animate={{
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Typography 
                variant="body2" 
                className="text-gray-500 text-sm font-medium"
              >
                Crafted to compliment you
              </Typography>
            </motion.div>
            <motion.div
              className="w-2 h-2 rounded-full bg-denim"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 1, 0.5],
                x: [0, -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />
          </motion.div>

          <motion.div
            animate={{
              opacity: [1, 0.9, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Typography 
              variant="body2" 
              className="text-gray-500 text-sm"
            >
              &copy; {new Date().getFullYear()} Uyom's Denim & Co. All rights reserved.
            </Typography>
          </motion.div>
        </motion.div>
      </Container>
    </motion.footer>
  )
}

export default Footer
