import { motion } from 'motion/react';
import { Sprout, Leaf } from 'lucide-react';

interface WateringCanSceneProps {
  showAnimation: boolean;
  points: number;
}

export function WateringCanScene({ showAnimation, points }: WateringCanSceneProps) {
  // Calculate growth stage based on accumulated points
  const getGrowthStage = () => {
    if (points <= 500) return 0; // seed
    if (points <= 1000) return 1; // sprout
    return 2; // two leaves
  };

  const growthStage = getGrowthStage();

  return (
    <div className="relative w-[500px] h-[400px]">
      {/* Watering Can */}
      <motion.div
        className="absolute"
        initial={{ x: 850, y: 180, rotate: 0 }}
        animate={showAnimation ? {
          x: 200,
          y: 100,
          rotate: -35,
        } : {
          x: 850,
          y: 180,
          rotate: 0,
        }}
        transition={{ 
          duration: 1.5,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Can body */}
          <path
            d="M40 60 L40 100 C40 110 50 120 60 120 L120 120 C130 120 140 110 140 100 L140 60 C140 50 130 40 120 40 L60 40 C50 40 40 50 40 60 Z"
            fill="#81C784"
            stroke="#A5D6A7"
            strokeWidth="2"
          />
          
          {/* Can rim */}
          <ellipse cx="90" cy="40" rx="50" ry="8" fill="#FFD54F" stroke="#FFE082" strokeWidth="2"/>
          
          {/* Handle */}
          <path
            d="M140 60 Q160 60 160 80 Q160 100 140 100"
            fill="none"
            stroke="#81C784"
            strokeWidth="6"
            strokeLinecap="round"
          />
          
          {/* Spout */}
          <path
            d="M40 70 L10 80 L10 90 L40 80 Z"
            fill="#81C784"
            stroke="#A5D6A7"
            strokeWidth="2"
          />
          
          {/* Spout holes */}
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={15}
              cy={82 + i * 4}
              r="1.5"
              fill="#1E1E1E"
            />
          ))}
          
          {/* Water drops animation */}
          {showAnimation && (
            <>
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.circle
                  key={i}
                  cx={10}
                  cy={90}
                  r="3"
                  fill="#64B5F6"
                  initial={{ opacity: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0.8, 0],
                    y: [0, 40, 80, 120],
                    x: [0, -5, -10, -15]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 1.5 + i * 0.15,
                    repeat: 2,
                    ease: "easeIn"
                  }}
                />
              ))}
            </>
          )}
        </svg>
      </motion.div>

      {/* Plant pot */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Pot */}
          <path
            d="M50 30 L40 100 C40 110 50 120 60 120 L140 120 C150 120 160 110 160 100 L150 30 Z"
            fill="#3E2723"
            stroke="#5D4037"
            strokeWidth="3"
          />
          <ellipse cx="100" cy="30" rx="50" ry="10" fill="#4E342E" stroke="#5D4037" strokeWidth="3"/>
          
          {/* Soil */}
          <ellipse cx="100" cy="28" rx="45" ry="8" fill="#6D4C41"/>
        </svg>

        {/* Plant Growth */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full"
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ 
            duration: 1.5,
            delay: showAnimation ? 2.5 : 0,
            type: "spring",
            stiffness: 100
          }}
        >
          {/* Seed stage */}
          {growthStage === 0 && (
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div 
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#81C784] to-[#66BB6A]"
                style={{ 
                  boxShadow: '0 0 30px rgba(129, 199, 132, 0.6)',
                  filter: 'drop-shadow(0 -4px 20px rgba(129, 199, 132, 0.3))'
                }}
              />
            </motion.div>
          )}

          {/* Sprout stage */}
          {growthStage === 1 && (
            <motion.div
              className="flex flex-col items-center"
              animate={{ 
                scale: [1, 1.02, 1],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sprout 
                className="text-[#81C784]" 
                style={{ 
                  width: 80, 
                  height: 80,
                  filter: 'drop-shadow(0 0 20px rgba(129, 199, 132, 0.6))'
                }} 
              />
              <div className="w-3 h-16 bg-gradient-to-b from-[#81C784] to-[#6D4C41] rounded-full mt-2" />
            </motion.div>
          )}

          {/* Two leaves stage */}
          {growthStage === 2 && (
            <motion.div
              className="relative flex flex-col items-center"
              animate={{ 
                y: [0, -8, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Main stem */}
              <div className="relative">
                {/* Top leaves cluster */}
                <div className="relative mb-4">
                  <motion.div
                    className="absolute -left-16 top-0"
                    animate={{ rotate: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Leaf className="text-[#81C784] w-16 h-16" style={{ filter: 'drop-shadow(0 0 10px rgba(129, 199, 132, 0.5))' }} />
                  </motion.div>
                  
                  <motion.div
                    className="absolute -right-16 top-0"
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  >
                    <Leaf className="text-[#A5D6A7] w-16 h-16" style={{ filter: 'drop-shadow(0 0 10px rgba(165, 214, 167, 0.5))' }} />
                  </motion.div>

                  {/* Center glow */}
                  <div 
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-[#81C784] to-[#66BB6A]"
                    style={{ 
                      boxShadow: '0 0 40px rgba(129, 199, 132, 0.8)',
                    }}
                  />
                </div>

                {/* Bottom leaves */}
                <div className="relative mb-6">
                  <motion.div
                    className="absolute -left-12 top-0"
                    animate={{ rotate: [0, -3, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                  >
                    <Leaf className="text-[#66BB6A] w-12 h-12" style={{ filter: 'drop-shadow(0 0 8px rgba(102, 187, 106, 0.4))' }} />
                  </motion.div>
                  
                  <motion.div
                    className="absolute -right-12 top-0"
                    animate={{ rotate: [0, 3, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 0.3 }}
                  >
                    <Leaf className="text-[#66BB6A] w-12 h-12" style={{ filter: 'drop-shadow(0 0 8px rgba(102, 187, 106, 0.4))' }} />
                  </motion.div>
                </div>
              </div>

              {/* Stem */}
              <div 
                className="w-4 h-32 bg-gradient-to-b from-[#81C784] to-[#6D4C41] rounded-full"
                style={{ boxShadow: 'inset 0 0 8px rgba(0,0,0,0.3)' }}
              />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Floating sparkles */}
      {showAnimation && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#81C784]"
              style={{
                left: `${20 + i * 60}px`,
                top: `${200 + Math.sin(i) * 50}px`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, -40, -80],
                x: [0, Math.sin(i * 2) * 20, Math.sin(i * 2) * 40]
              }}
              transition={{
                duration: 2,
                delay: 2.5 + i * 0.1,
                repeat: 1,
                ease: "easeOut"
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
