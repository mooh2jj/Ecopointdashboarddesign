import { motion } from 'motion/react';
import { Sprout, Leaf } from 'lucide-react';

interface PlantSceneProps {
  showAnimation: boolean;
  points: number;
}

export function PlantScene({ showAnimation, points }: PlantSceneProps) {
  const getGrowthStage = () => {
    if (points <= 500) return 0;
    if (points <= 1000) return 1;
    return 2;
  };

  const growthStage = getGrowthStage();
  
  // 애니메이션 easing: easeInOutCubic
  const cubicEasing = [0.645, 0.045, 0.355, 1.0];

  return (
    <div className="relative w-[600px] h-[400px] flex items-end justify-center">
      {/* Plant Container - 중앙 */}
      <div className="relative flex flex-col items-center">
        {/* Plant Pot */}
        <motion.div
          className="relative"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: cubicEasing }}
        >
          <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="potGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4E342E" />
                <stop offset="100%" stopColor="#3E2723" />
              </linearGradient>
            </defs>
            
            <path
              d="M50 30 L40 100 C40 108 48 115 57 115 L143 115 C152 115 160 108 160 100 L150 30 Z"
              fill="url(#potGradient)"
              stroke="#5D4037"
              strokeWidth="3"
            />
            <ellipse cx="100" cy="30" rx="50" ry="10" fill="#5D4037" stroke="#6D4C41" strokeWidth="3"/>
            <ellipse cx="100" cy="28" rx="45" ry="8" fill="#6D4C41"/>
          </svg>

          {/* Plant Growth - 화분 위에 */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2"
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ 
              duration: 1.6,
              delay: showAnimation ? 2.8 : 0,
              type: "spring",
              stiffness: 80
            }}
          >
            {/* Seed Stage */}
            {growthStage === 0 && (
              <motion.div
                className="flex flex-col items-center"
                animate={{ scale: [1, 1.08, 1], y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: cubicEasing }}
              >
                <div 
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-[#81C784] to-[#66BB6A]"
                  style={{ boxShadow: '0 0 28px rgba(129,199,132,0.7)' }}
                />
              </motion.div>
            )}

            {/* Sprout Stage */}
            {growthStage === 1 && (
              <motion.div
                className="flex flex-col items-center"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: cubicEasing }}
              >
                <Sprout 
                  className="text-[#81C784]" 
                  style={{ 
                    width: 90, 
                    height: 90,
                    filter: 'drop-shadow(0 0 18px rgba(129,199,132,0.6))'
                  }} 
                />
                <div className="w-3 h-20 bg-gradient-to-b from-[#81C784] to-[#6D4C41] rounded-full mt-2" />
              </motion.div>
            )}

            {/* Full Grown Plant with Two Leaves */}
            {growthStage === 2 && (
              <motion.div
                className="flex flex-col items-center"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: cubicEasing }}
              >
                {/* Leaves Container */}
                <div className="relative mb-4">
                  {/* Left Leaf */}
                  <motion.div
                    className="absolute -left-20 top-4"
                    animate={{ rotate: [0, -5, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: cubicEasing }}
                  >
                    <Leaf 
                      className="text-[#81C784]" 
                      style={{ 
                        width: 50, 
                        height: 50,
                        filter: 'drop-shadow(0 0 10px rgba(129,199,132,0.5))'
                      }} 
                    />
                  </motion.div>
                  
                  {/* Right Leaf */}
                  <motion.div
                    className="absolute -right-20 top-4"
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, delay: 0.4, ease: cubicEasing }}
                  >
                    <Leaf 
                      className="text-[#A5D6A7]" 
                      style={{ 
                        width: 50, 
                        height: 50,
                        filter: 'drop-shadow(0 0 10px rgba(165,214,167,0.5))'
                      }} 
                    />
                  </motion.div>

                  {/* Center Top Glow */}
                  <div 
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-[#81C784] to-[#66BB6A] relative z-10"
                    style={{ boxShadow: '0 0 36px rgba(129,199,132,0.8)' }}
                  />

                  {/* Bottom Small Leaves */}
                  <motion.div
                    className="absolute -left-14 top-12"
                    animate={{ rotate: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: cubicEasing }}
                  >
                    <Leaf 
                      className="text-[#66BB6A]" 
                      style={{ 
                        width: 36, 
                        height: 36,
                        filter: 'drop-shadow(0 0 6px rgba(102,187,106,0.4))'
                      }} 
                    />
                  </motion.div>
                  
                  <motion.div
                    className="absolute -right-14 top-12"
                    animate={{ rotate: [0, 3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.25, ease: cubicEasing }}
                  >
                    <Leaf 
                      className="text-[#66BB6A]" 
                      style={{ 
                        width: 36, 
                        height: 36,
                        filter: 'drop-shadow(0 0 6px rgba(102,187,106,0.4))'
                      }} 
                    />
                  </motion.div>
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
      </div>

      {/* Watering Can - 항상 식물 우측에 고정 */}
      <motion.div
        className="absolute right-4 top-[-70px]"
        initial={{ opacity: 0, x: 20 }}
        animate={showAnimation ? {
          opacity: 1,
          x: 0,
          rotate: [0, -35, -35, 0],
        } : {
          opacity: 1,
          x: 0,
          rotate: 0
        }}
        transition={{ 
          opacity: { duration: 0.6 },
          x: { duration: 0.6 },
          rotate: { 
            duration: 2.5,
            times: [0, 0.3, 0.7, 1],
            ease: cubicEasing,
            delay: 0.4
          }
        }}
      >
        <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="canGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#81C784" />
              <stop offset="100%" stopColor="#66BB6A" />
            </linearGradient>
          </defs>
          
          {/* Can body */}
          <path
            d="M40 60 L40 100 C40 108 48 115 57 115 L123 115 C132 115 140 108 140 100 L140 60 C140 52 132 45 123 45 L57 45 C48 45 40 52 40 60 Z"
            fill="url(#canGradient)"
            stroke="#A5D6A7"
            strokeWidth="2.5"
          />
          
          {/* Rim */}
          <ellipse cx="90" cy="45" rx="50" ry="8" fill="#FFD54F" stroke="#FFE082" strokeWidth="2.5"/>
          
          {/* Handle */}
          <path
            d="M140 60 Q160 60 160 82 Q160 100 140 100"
            fill="none"
            stroke="#81C784"
            strokeWidth="6"
            strokeLinecap="round"
          />
          
          {/* Spout */}
          <path
            d="M40 70 L10 80 L10 90 L40 82 Z"
            fill="#81C784"
            stroke="#A5D6A7"
            strokeWidth="2.5"
          />
          
          {/* Spout holes */}
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={14} cy={82 + i * 3} r="1.5" fill="#1E1E1E" />
          ))}
          
          {/* Water drops */}
          {showAnimation && (
            <>
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <motion.ellipse
                  key={i}
                  cx={10}
                  cy={90}
                  rx="3"
                  ry="4"
                  fill="#64B5F6"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.9, 0.7, 0],
                    cy: [90, 140, 190, 240],
                    cx: [10, 0, -10, -25]
                  }}
                  transition={{
                    duration: 1.8,
                    delay: 1.2 + i * 0.1,
                    repeat: 2,
                    ease: cubicEasing
                  }}
                  style={{ filter: 'drop-shadow(0 0 5px rgba(100,181,246,0.7))' }}
                />
              ))}
            </>
          )}
        </svg>
      </motion.div>

      {/* Sparkles - 식물 주변 */}
      {showAnimation && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#81C784]"
              style={{
                left: `${150 + (i % 4) * 30}px`,
                top: `${120 + Math.floor(i / 4) * 40}px`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.4, 0],
                y: [0, -40, -80],
                x: [0, (i % 2 === 0 ? 1 : -1) * 20, (i % 2 === 0 ? 1 : -1) * 40]
              }}
              transition={{
                duration: 2.4,
                delay: 2.8 + i * 0.08,
                repeat: 1,
                ease: cubicEasing
              }}
              style={{ boxShadow: '0 0 8px rgba(129,199,132,0.8)' }}
            />
          ))}
        </>
      )}
    </div>
  );
}
