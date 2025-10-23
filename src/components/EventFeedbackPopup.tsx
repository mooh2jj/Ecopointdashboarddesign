import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { Button } from './ui/button';

interface EventFeedbackPopupProps {
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  onClose: () => void;
}

export function EventFeedbackPopup({ type, message, onClose }: EventFeedbackPopupProps) {
  const config = {
    success: {
      icon: CheckCircle,
      color: '#4CAF50',
      bgColor: 'from-[#4CAF50]/20 to-[#4CAF50]/10',
      borderColor: 'border-[#4CAF50]'
    },
    warning: {
      icon: AlertTriangle,
      color: '#FFB300',
      bgColor: 'from-[#FFB300]/20 to-[#FFB300]/10',
      borderColor: 'border-[#FFB300]'
    },
    error: {
      icon: XCircle,
      color: '#E53935',
      bgColor: 'from-[#E53935]/20 to-[#E53935]/10',
      borderColor: 'border-[#E53935]'
    },
    info: {
      icon: Info,
      color: '#2196F3',
      bgColor: 'from-[#2196F3]/20 to-[#2196F3]/10',
      borderColor: 'border-[#2196F3]'
    }
  };

  const { icon: Icon, color, bgColor, borderColor } = config[type];

  return (
    <AnimatePresence>
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          className={`bg-gradient-to-br ${bgColor} backdrop-blur-md rounded-2xl p-8 border-2 ${borderColor} w-[600px]`}
          style={{ boxShadow: '0px 8px 32px rgba(0,0,0,0.2)' }}
        >
          <div className="flex flex-col items-center text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="mb-6"
            >
              <div 
                className="w-20 h-20 rounded-full bg-white flex items-center justify-center"
                style={{ boxShadow: `0 0 20px ${color}40` }}
              >
                <Icon className="w-12 h-12" style={{ color }} />
              </div>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="text-[#212121] text-2xl mb-2">{message}</div>
              <div className="text-[#757575]">
                {type === 'warning' && 'Try to maintain smooth acceleration for better eco-driving'}
                {type === 'success' && 'Great job! Keep up the eco-friendly driving'}
                {type === 'error' && 'Harsh braking detected. Please drive more carefully'}
                {type === 'info' && 'Your driving pattern is being analyzed'}
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4 w-full"
            >
              <Button
                onClick={onClose}
                className="flex-1 bg-white text-[#212121] border-2 border-[#E0E0E0] hover:bg-[#F5F5F5]"
                style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}
              >
                Dismiss
              </Button>
              <Button
                onClick={onClose}
                className="flex-1 text-white hover:opacity-90"
                style={{ 
                  backgroundColor: color,
                  boxShadow: '0px 4px 10px rgba(0,0,0,0.1)'
                }}
              >
                OK
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
