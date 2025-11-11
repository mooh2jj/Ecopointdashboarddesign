import { motion } from "motion/react";
import { Sprout, Leaf } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import seedImage from "figma:asset/d324268ea5e178c3f734a2767d6534572930cb97.png";
import sproutImage from "figma:asset/9c1ab17231d6c41476937d6a962c1d21ec06d7f5.png";
import plantImage from "figma:asset/059b4c1516a5fd6752183a64bf754e660ef133b8.png";
import wateringCanImage from "figma:asset/7a8563f10ac551f86adc750974786d0e98c30e50.png";

interface PlantSceneProps {
  showAnimation: boolean;
  points: number;
}

export function PlantScene({
  showAnimation,
  points,
}: PlantSceneProps) {
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
        {/* Plant Growth - 화분 제거하고 식물만 표시 */}
        <motion.div
          className="relative"
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{
            duration: 1.6,
            delay: showAnimation ? 2.8 : 0,
            type: "spring",
            stiffness: 80,
          }}
        >
          {/* Seed Stage */}
          {growthStage === 0 && (
            <motion.div
              className="flex flex-col items-center"
              animate={{ scale: [1, 1.05, 1], y: [0, -3, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: cubicEasing,
              }}
            >
              <ImageWithFallback
                src={seedImage}
                alt="씨앗"
                width={280}
                height={280}
                style={{
                  filter:
                    "drop-shadow(0 4px 12px rgba(129,199,132,0.4))",
                }}
              />
            </motion.div>
          )}

          {/* Sprout Stage */}
          {growthStage === 1 && (
            <motion.div
              className="flex flex-col items-center"
              animate={{ scale: [1, 1.02, 1], y: [0, -2, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: cubicEasing,
              }}
            >
              <ImageWithFallback
                src={sproutImage}
                alt="새싹"
                width={440}
                height={440}
                style={{
                  filter:
                    "drop-shadow(0 4px 16px rgba(129,199,132,0.5))",
                }}
              />
            </motion.div>
          )}

          {/* Full Grown Plant */}
          {growthStage === 2 && (
            <motion.div
              className="flex flex-col items-center"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: cubicEasing,
              }}
            >
              <ImageWithFallback
                src={plantImage}
                alt="다육식물"
                width={273}
                height={273}
                style={{
                  filter:
                    "drop-shadow(0 6px 20px rgba(129,199,132,0.6))",
                }}
              />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Watering Can - 물주기 애니메이션 개선 */}
      <motion.div
        className="absolute right-[60px] top-[20px]"
        initial={{ opacity: 0, y: -30, x: 30 }}
        animate={
          showAnimation
            ? {
                opacity: [0, 1, 1, 1, 1],
                y: [-30, 0, 0, 0, -30],
                x: [30, 0, 0, 0, 30],
                rotate: [0, 0, -25, -25, 0],
              }
            : {
                opacity: 0,
                y: -30,
                x: 30,
                rotate: 0,
              }
        }
        transition={{
          duration: 4,
          times: [0, 0.15, 0.3, 0.8, 1],
          ease: cubicEasing,
          delay: 0.2,
        }}
        style={{ transformOrigin: "center center" }}
      >
        <ImageWithFallback
          src={wateringCanImage}
          alt="물뿌리개"
          width={200}
          height={200}
          style={{
            filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.3))",
          }}
        />

        {/* Water drops from spout */}
        {showAnimation && (
          <svg
            width="300"
            height="300"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
            }}
          >
            {/* Water stream */}
            <motion.path
              d="M40 180 Q20 240 -20 310"
              stroke="#64B5F6"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: 2.5,
                delay: 1.2,
                times: [0, 0.2, 0.8, 1],
                ease: "easeInOut",
              }}
              style={{
                filter:
                  "drop-shadow(0 0 4px rgba(100,181,246,0.6))",
                strokeDasharray: "6 6",
              }}
            />

            {/* Individual water drops */}
            {[...Array(20)].map((_, i) => (
              <motion.circle
                key={i}
                cx={40}
                cy={180}
                r="3"
                fill="#64B5F6"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.9, 0.7, 0],
                  cy: [180, 230, 280, 330],
                  cx: [40, 20, 0, -30],
                  scale: [1, 1.1, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: 1.2 + i * 0.06,
                  ease: [0.4, 0, 0.6, 1],
                  repeat: 0,
                }}
                style={{
                  filter:
                    "drop-shadow(0 0 3px rgba(100,181,246,0.8))",
                }}
              />
            ))}
          </svg>
        )}
      </motion.div>

      {/* Water splash effect on plant */}
      {showAnimation && (
        <motion.div
          className="absolute left-1/2 top-[180px] -translate-x-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0, 0.6, 0.8, 0],
            scale: [0, 0, 1.2, 1.5, 2],
          }}
          transition={{
            duration: 1.5,
            delay: 2.5,
            ease: "easeOut",
          }}
        >
          <div
            className="w-24 h-24 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(100,181,246,0.4) 0%, transparent 70%)",
            }}
          />
        </motion.div>
      )}

      {/* Sparkles - 식물 주변 */}
      {showAnimation && (
        <>
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#81C784]"
              style={{
                left: `${180 + (i % 4) * 35}px`,
                top: `${140 + Math.floor(i / 4) * 35}px`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.8, 0],
                scale: [0, 1.2, 1.5, 0],
                y: [0, -30, -60, -90],
                x: [
                  0,
                  (i % 2 === 0 ? 1 : -1) * 15,
                  (i % 2 === 0 ? 1 : -1) * 30,
                  (i % 2 === 0 ? 1 : -1) * 45,
                ],
              }}
              transition={{
                duration: 2.6,
                delay: 2.8 + i * 0.06,
                ease: cubicEasing,
              }}
              style={{
                boxShadow: "0 0 10px rgba(129,199,132,0.9)",
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}