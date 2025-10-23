import { Home, BarChart3, Repeat, User } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function NavigationBar({ activeTab, onTabChange }: NavigationBarProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
    { id: 'exchange', label: 'Exchange', icon: Repeat },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav 
      className="absolute bottom-0 left-0 right-0 h-[100px] bg-white/90 backdrop-blur-sm border-t border-[#E0E0E0] z-20"
      style={{ boxShadow: '0px -4px 10px rgba(0,0,0,0.1)' }}
    >
      <div className="h-full flex items-center justify-center gap-2 px-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center gap-2 px-16 py-4 rounded-2xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#4CAF50]/20 to-[#2196F3]/20 rounded-2xl border-2 border-[#4CAF50]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  style={{ boxShadow: '0px 4px 10px rgba(76, 175, 80, 0.3)' }}
                />
              )}

              {/* Icon */}
              <div className="relative">
                <Icon
                  className={`w-7 h-7 transition-colors ${
                    isActive 
                      ? 'text-[#4CAF50]' 
                      : 'text-[#9E9E9E]'
                  }`}
                />
              </div>

              {/* Label */}
              <span
                className={`text-sm transition-colors ${
                  isActive 
                    ? 'text-[#4CAF50]' 
                    : 'text-[#9E9E9E]'
                }`}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
