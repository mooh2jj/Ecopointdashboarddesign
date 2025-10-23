import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sprout, Leaf } from 'lucide-react';

interface TreeAnimationProps {
  points: number;
}

export function TreeAnimation({ points }: TreeAnimationProps) {
  const [growthStage, setGrowthStage] = useState(0);

  useEffect(() => {
    // Calculate growth stage based on points
    // 0-300: seed, 301-800: sprout, 801+: full tree
    if (points <= 300) setGrowthStage(0);
    else if (points <= 800) setGrowthStage(1);
    else setGrowthStage(2);
  }, [points]);

  const getTreeSize = () => {
    switch (growthStage) {
      case 0: return { height: 100, width: 80, leaves: 0 };
      case 1: return { height: 200, width: 160, leaves: 6 };
      default: return { height: 300, width: 240, leaves: 12 };
    }
  };

  const size = getTreeSize();

  return (
    <div className="relative flex items-end justify-center">
      {/* Ground/Pot */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="absolute bottom-0 w-[180px] h-[100px] bg-gradient-to-b from-[#8D6E63] to-[#6D4C41] rounded-t-3xl border-4 border-[#5D4037]"
        style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.2)' }}
      >
        <div className="absolute inset-x-0 top-0 h-6 bg-[#A1887F]/40" />
      </motion.div>

      {/* Tree */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-end"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          height: size.height,
          width: size.width
        }}
        transition={{ 
          duration: 1.5,
          ease: "easeOut"
        }}
      >
        {/* Leaves/Crown */}
        {growthStage > 0 && (
          <motion.div
            className="relative mb-6"
            animate={{ 
              scale: [1, 1.03, 1],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Main crown circle */}
            <motion.div
              className="rounded-full bg-gradient-to-br from-[#4CAF50] to-[#2E7D32]"
              style={{
                width: size.width * 0.8,
                height: size.width * 0.8,
                boxShadow: '0 8px 32px rgba(76, 175, 80, 0.4)'
              }}
              animate={{ 
                boxShadow: [
                  '0 8px 32px rgba(76, 175, 80, 0.4)',
                  '0 8px 40px rgba(76, 175, 80, 0.6)',
                  '0 8px 32px rgba(76, 175, 80, 0.4)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Leaf decorations */}
            {[...Array(size.leaves)].map((_, i) => {
              const angle = (i / size.leaves) * Math.PI * 2;
              const radius = size.width * 0.35;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    x,
                    y,
                  }}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ 
                    scale: 1,
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ 
                    scale: { delay: i * 0.1, duration: 0.5 },
                    rotate: { 
                      delay: i * 0.2,
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <Leaf 
                    className="text-[#66BB6A]" 
                    style={{ 
                      width: 28, 
                      height: 28,
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                    }} 
                  />
                </motion.div>
              );
            })}

            {/* Center shine */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div 
                className="rounded-full bg-gradient-to-br from-white/60 to-white/20"
                style={{
                  width: 40 + growthStage * 20,
                  height: 40 + growthStage * 20,
                }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Seed/Sprout for early stages */}
        {growthStage === 0 && (
          <motion.div
            className="relative"
            animate={{ 
              y: [0, -8, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sprout 
              className="text-[#4CAF50]" 
              style={{ 
                width: 80, 
                height: 80,
                filter: 'drop-shadow(0 4px 8px rgba(76, 175, 80, 0.3))'
              }} 
            />
          </motion.div>
        )}

        {/* Trunk */}
        {growthStage > 0 && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 50 + growthStage * 30 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-[35px] bg-gradient-to-b from-[#8D6E63] to-[#6D4C41] rounded-t-lg"
            style={{
              boxShadow: 'inset 0 0 8px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)'
            }}
          />
        )}
      </motion.div>

      {/* Floating sparkles */}
      {growthStage >= 2 && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-[#4CAF50]/60"
              style={{
                left: `${30 + i * 10}%`,
                bottom: 120 + i * 20,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.sin(i) * 15, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.2, 0]
              }}
              transition={{
                duration: 2.5 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
