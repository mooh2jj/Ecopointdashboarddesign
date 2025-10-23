import { Header } from './Header';
import { TreeAnimation } from './TreeAnimation';
import { NavigationBar } from './NavigationBar';

interface MainDashboardProps {
  ecoPoints: number;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MainDashboard({ ecoPoints, activeTab, onTabChange }: MainDashboardProps) {
  return (
    <div className="w-full h-full relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent pointer-events-none" />

      {/* Header */}
      <Header />

      {/* Main Content - Tree Animation */}
      <div className="absolute inset-0 flex items-center justify-center pt-20 pb-24">
        <div className="flex flex-col items-center">
          <TreeAnimation points={ecoPoints} />
          
          {/* Points Display */}
          <div className="mt-12 text-center">
            <div className="text-[#2196F3] tracking-wider mb-2">Eco Points</div>
            <div className="text-[#212121] text-7xl mb-3">{ecoPoints.toLocaleString()}</div>
            <div className="text-[#4CAF50] text-xl">Drive Green, Earn Points!</div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <NavigationBar activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
