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
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 흙더미 */}
            <ellipse cx="20" cy="30" rx="14" ry="4" fill="#8D6E63" opacity="0.9"/>
            <path d="M10 28C10 28 12 24 20 24C28 24 30 28 30 28L28 32C28 32 26 30 20 30C14 30 12 32 12 32L10 28Z" fill="#A1887F"/>
            <ellipse cx="15" cy="27" rx="2" ry="1" fill="#6D4C41" opacity="0.6"/>
            <ellipse cx="24" cy="28" rx="2.5" ry="1.2" fill="#6D4C41" opacity="0.6"/>
            
            {/* 줄기 */}
            <path d="M20 24L20 14" stroke="#7CB342" strokeWidth="1.5" strokeLinecap="round"/>
            
            {/* 왼쪽 잎 */}
            <path d="M20 16C20 16 14 12 10 10C10 10 9 14 12 18C15 22 20 20 20 20" fill="#9CCC65"/>
            <path d="M20 16C20 16 14 12 10 10C10 10 9 14 12 18C15 22 20 20 20 20" fill="#8BC34A" opacity="0.7"/>
            
            {/* 오른쪽 잎 */}
            <path d="M20 16C20 16 26 12 30 10C30 10 31 14 28 18C25 22 20 20 20 20" fill="#9CCC65"/>
            <path d="M20 16C20 16 26 12 30 10C30 10 31 14 28 18C25 22 20 20 20 20" fill="#8BC34A" opacity="0.7"/>
            
            {/* 잎맥 */}
            <path d="M20 17L14 13" stroke="#7CB342" strokeWidth="0.5" opacity="0.5"/>
            <path d="M20 17L26 13" stroke="#7CB342" strokeWidth="0.5" opacity="0.5"/>
          </svg>
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