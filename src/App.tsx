import { useState, useEffect } from 'react';
import { SideNav } from './components/SideNav';
import { MainDashboardPage } from './components/MainDashboardPage';
import { PointManagementPage } from './components/PointManagementPage';
import { DriverAnalysisPage } from './components/DriverAnalysisPage';
import { SplashScreenDark } from './components/SplashScreenDark';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeScreen, setActiveScreen] = useState('main');
  const [ecoPoints, setEcoPoints] = useState(1230);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handlePointsChange = (points: number) => {
    setEcoPoints(prev => prev + points);
  };

  if (isLoading) {
    return <SplashScreenDark />;
  }

  return (
    <div className="w-[1920px] h-[720px] bg-[#121212] overflow-hidden flex">
      {/* Side Navigation - Safe zone 고려 */}
      <SideNav activeScreen={activeScreen} onScreenChange={setActiveScreen} />

      {/* Main Content - 활성 영역 1920×640 */}
      <div className="flex-1 relative">
        {activeScreen === 'main' && (
          <MainDashboardPage ecoPoints={ecoPoints} onPointsChange={handlePointsChange} />
        )}
        {activeScreen === 'points' && (
          <PointManagementPage ecoPoints={ecoPoints} onExchange={handlePointsChange} />
        )}
        {activeScreen === 'analysis' && (
          <DriverAnalysisPage />
        )}
      </div>

      <Toaster />
    </div>
  );
}