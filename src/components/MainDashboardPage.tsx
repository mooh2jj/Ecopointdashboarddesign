import { useState, useEffect } from 'react';
import { PlantScene } from './PlantScene';
import { FeedbackSidePanel } from './FeedbackSidePanel';
import { Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MainDashboardPageProps {
  ecoPoints: number;
  onPointsChange: (points: number) => void;
}

export function MainDashboardPage({ ecoPoints, onPointsChange }: MainDashboardPageProps) {
  const [showPoints, setShowPoints] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPointsEarned(130);
      setShowPoints(true);
      onPointsChange(130);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const date = new Date();
  const dateStr = date.toLocaleDateString('ko-KR', { 
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  });

  return (
    <div className="w-full h-full relative bg-[#121212]">
      {/* Header - 상단 80px 영역 활용 */}
      <div className="absolute top-6 left-16 z-10">
        <div className="text-[#B0BEC5] mb-1" style={{ fontSize: '18px' }}>2025년 8월 14일 목요일</div>
        <div className="flex items-center gap-2 text-[#64B5F6]" style={{ fontSize: '16px' }}>
          <Sun className="w-5 h-5" />
          <span>22°C | 맑음 | 서울특별시</span>
        </div>
      </div>

      {/* Center Display - Plant Scene (활성 영역 1920×640 내부) */}
      <div className="absolute top-[100px] bottom-0 left-0 right-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <PlantScene showAnimation={showPoints} points={ecoPoints} />
          
          <AnimatePresence>
            {showPoints && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 2.8, duration: 0.8, ease: [0.645, 0.045, 0.355, 1.0] }}
                className="mt-6 text-center"
              >
                <div 
                  className="text-[#81C784] mb-2"
                  style={{ 
                    fontSize: '32px',
                    fontWeight: 700,
                    textShadow: '0 0 20px rgba(129,199,132,0.5)' 
                  }}
                >
                  ECO POINTS +{pointsEarned}
                </div>
                <div className="text-[#B0BEC5]" style={{ fontSize: '20px' }}>경제속도 (75km/h) 준수</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Feedback Side Panel */}
      <FeedbackSidePanel ecoPoints={ecoPoints} />
    </div>
  );
}