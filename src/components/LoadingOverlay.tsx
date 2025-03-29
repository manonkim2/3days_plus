'use client'

import { motion } from 'framer-motion'

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/20">
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.3, 1] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
          type: 'tween',
        }}
        style={{
          width: 50,
          height: 50,
          border: '3px solid #dd00ee',
          borderRadius: '50%',
          backgroundColor: 'transparent',
        }}
      />
    </div>
  )
}

export default LoadingOverlay
