import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="w-[1920px] h-[720px] bg-gradient-to-br from-[#E8F5E9] via-[#C8E6C9] to-[#A5D6A7] flex items-center justify-center overflow-hidden relative">
      {/* Animated background circles */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-[#4CAF50]/10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full bg-[#2196F3]/10"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1,
            type: "spring",
            stiffness: 100
          }}
          className="mb-8"
        >
          <div 
            className="relative w-40 h-40 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#2196F3] flex items-center justify-center"
            style={{ boxShadow: '0 12px 48px rgba(76, 175, 80, 0.4)' }}
          >
            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/40 to-white/0"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Car + Leaf Icon */}
            <div className="relative">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Car body */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  d="M20 35L25 25H55L60 35V50H20V35Z"
                  stroke="white"
                  strokeWidth="3"
                  fill="white"
                  fillOpacity="0.9"
                />
                {/* Wheels */}
                <motion.circle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  cx="30"
                  cy="50"
                  r="5"
                  fill="white"
                />
                <motion.circle
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  cx="50"
                  cy="50"
                  r="5"
                  fill="white"
                />
                {/* Leaf */}
                <motion.g
                  initial={{ scale: 0, y: -10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                >
                  <Leaf className="text-white" style={{ width: 24, height: 24, x: 28, y: 15 }} />
                </motion.g>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* App name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-[#4CAF50] text-6xl mb-4"
        >
          Eco Drive
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-[#2196F3] text-3xl mb-12"
        >
          Drive Smart, Earn Green.
        </motion.div>

        {/* Loading animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-[#4CAF50]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
