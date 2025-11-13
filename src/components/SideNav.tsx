import { Home, BarChart3, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface SideNavProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}

export function SideNav({ activeScreen, onScreenChange }: SideNavProps) {
  const navItems = [
    { id: 'main', label: '메인 화면', icon: Home },
    { id: 'points', label: '포인트 관리', icon: BarChart3 },
    { id: 'analysis', label: '운전자 분석', icon: TrendingUp },
  ];

  return (
    <nav 
      className="w-[140px] h-full bg-[#1E1E1E] flex flex-col items-center py-8"
      style={{ boxShadow: '4px 0 10px rgba(0,0,0,0.3)' }}
    >
      {/* Logo */}
      <div className="mb-12">
        <div 
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#81C784] to-[#64B5F6] flex items-center justify-center"
          style={{ boxShadow: '0 4px 16px rgba(129,199,132,0.4)' }}
        >
        </div>
      </div>

      {/* Navigation Items - 터치 영역 88×88dp 이상 확보 */}
      <div className="flex-1 flex flex-col gap-3 w-full px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className="relative flex flex-col items-center justify-center gap-2 rounded-xl transition-colors"
              style={{ minHeight: '88px', minWidth: '88px' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-[#64B5F6]/20 rounded-xl border-2 border-[#64B5F6]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  style={{ boxShadow: '0 0 16px rgba(100,181,246,0.3)' }}
                />
              )}

              <div className="relative">
                <Icon
                  className={`w-7 h-7 transition-colors ${
                    isActive ? 'text-[#64B5F6]' : 'text-[#81C784]'
                  }`}
                  style={{
                    filter: isActive ? 'drop-shadow(0 0 6px rgba(100,181,246,0.6))' : 'none'
                  }}
                />
              </div>

              <span
                className={`text-center px-1 leading-tight transition-colors ${
                  isActive ? 'text-[#FFFFFF]' : 'text-[#B0BEC5]'
                }`}
                style={{ fontSize: '14px' }}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}