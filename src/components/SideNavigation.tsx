import { Home, BarChart3, Gift } from 'lucide-react';
import { motion } from 'motion/react';

interface SideNavigationProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}

export function SideNavigation({ activeScreen, onScreenChange }: SideNavigationProps) {
  const navItems = [
    { id: 'home', label: '메인 화면', icon: Home },
    { id: 'points', label: '포인트 관리', icon: BarChart3 },
    { id: 'exchange', label: '포인트 교환', icon: Gift },
  ];

  return (
    <nav 
      className="w-[140px] h-full bg-[#1E1E1E] flex flex-col items-center py-8"
      style={{ boxShadow: '4px 0 12px rgba(0,0,0,0.4)' }}
    >
      {/* Logo */}
      <div className="mb-12">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#81C784] to-[#64B5F6] flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4L8 9V19L16 24L24 19V9L16 4Z" fill="white" fillOpacity="0.95"/>
            <circle cx="16" cy="14" r="3" fill="#81C784"/>
          </svg>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 flex flex-col gap-3 w-full px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className="relative flex flex-col items-center justify-center gap-2 py-6 rounded-2xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-[#64B5F6]/20 rounded-2xl border-2 border-[#64B5F6]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  style={{ boxShadow: '0 0 20px rgba(100, 181, 246, 0.3)' }}
                />
              )}

              {/* Icon */}
              <div className="relative">
                <Icon
                  className={`w-7 h-7 transition-colors ${
                    isActive ? 'text-[#64B5F6]' : 'text-[#81C784]'
                  }`}
                  style={{
                    filter: isActive ? 'drop-shadow(0 0 8px rgba(100, 181, 246, 0.6))' : 'none'
                  }}
                />
              </div>

              {/* Label */}
              <span
                className={`text-xs text-center transition-colors px-1 ${
                  isActive ? 'text-[#FFFFFF]' : 'text-[#B0BEC5]'
                }`}
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
