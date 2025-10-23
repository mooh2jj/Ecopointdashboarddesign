import { useState, useEffect } from 'react';
import { WateringCanScene } from './WateringCanScene';
import { CalendarPanel } from './CalendarPanel';
import { Sun, Cloud } from 'lucide-react';

interface MainScreenProps {
  ecoPoints: number;
  onPointsChange: (points: number) => void;
}

export function MainScreen({ ecoPoints, onPointsChange }: MainScreenProps) {
  const [showPoints, setShowPoints] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  useEffect(() => {
    // Simulate eco driving event
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
      {/* Top Left - Info Header */}
      <div className="absolute top-8 left-8 z-10">
        <div className="text-[#B0BEC5] text-xl mb-3">{dateStr}</div>
        <div className="flex items-center gap-3 text-[#64B5F6]">
          <Sun className="w-6 h-6" />
          <span className="text-lg">22°C  |  맑음  |  서울특별시</span>
        </div>
      </div>

      {/* Center - Eco Plant Scene */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <WateringCanScene showAnimation={showPoints} points={ecoPoints} />
          
          {showPoints && (
            <div className="mt-8 text-center">
              <div className="text-[#B0BEC5] text-2xl mb-3">경제속도 (75 km/h) 준수</div>
              <div className="text-[#81C784] text-5xl">ECO POINTS +{pointsEarned}</div>
            </div>
          )}
        </div>
      </div>

      {/* Right - Calendar Panel */}
      <CalendarPanel ecoPoints={ecoPoints} />
    </div>
  );
}
