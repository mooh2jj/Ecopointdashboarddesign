import { Card } from "./ui/card";
import {
  TrendingUp,
  Leaf,
  Zap,
  Target,
  Award,
} from "lucide-react";
import { motion } from "motion/react";

interface FeedbackSidePanelProps {
  ecoPoints: number;
}

interface PointEntry {
  icon: any;
  label: string;
  points: number;
  time: string;
  color: string;
}

export function FeedbackSidePanel({
  ecoPoints,
}: FeedbackSidePanelProps) {
  const todayEntries: PointEntry[] = [
    {
      icon: Target,
      label: "경제속도 준수",
      points: 130,
      time: "14:23",
      color: "#81C784",
    },
    {
      icon: Leaf,
      label: "급가속 0회",
      points: 85,
      time: "14:10",
      color: "#66BB6A",
    },
    {
      icon: Zap,
      label: "급감속 0회",
      points: 85,
      time: "14:10",
      color: "#64B5F6",
    },
  ];

  const totalToday = todayEntries.reduce(
    (sum, entry) => sum + entry.points,
    0,
  );

  return (
    <div
      className="absolute top-0 right-0 w-[400px] h-full bg-[#1A1A1A] border-l border-[#2E2E2E]"
      style={{ padding: "100px 40px 40px 40px" }}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-6 h-6 text-[#81C784]" />
          <div
            className="text-[#FFFFFF]"
            style={{ fontSize: "24px", fontWeight: 600 }}
          >
            오늘의 리워드
          </div>
        </div>
        <div
          className="text-[#B0BEC5]"
          style={{ fontSize: "14px" }}
        >
          친환경 운전으로 포인트를 획득했어요
        </div>
      </div>

      {/* Total Points Card */}
      <Card className="bg-gradient-to-br from-[#81C784] to-[#66BB6A] border-none mb-6 p-5">
        <div className="flex items-center justify-between">
          <div>
            <div
              className="text-[#FFFFFF] opacity-90 mb-1"
              style={{ fontSize: "14px" }}
            >
              오늘 적립
            </div>
            <div
              className="text-[#FFFFFF]"
              style={{ fontSize: "36px", fontWeight: 700 }}
            >
              +{totalToday}
            </div>
          </div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Leaf className="w-16 h-16 text-[#FFFFFF] opacity-20" />
          </motion.div>
        </div>
        <div
          className="text-[#FFFFFF] opacity-80 mt-2"
          style={{ fontSize: "12px" }}
        >
          전체 보유: {ecoPoints.toLocaleString()} P
        </div>
      </Card>

      {/* Feedback Items */}
      <div className="space-y-3">
        <div
          className="text-[#B0BEC5] mb-3"
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          적립 내역
        </div>

        {todayEntries.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Card className="bg-[#242424] border-[#2E2E2E] p-4 hover:bg-[#2A2A2A] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: `${entry.color}20`,
                    }}
                  >
                    <entry.icon
                      className="w-5 h-5"
                      style={{ color: entry.color }}
                    />
                  </div>
                  <div>
                    <div
                      className="text-[#FFFFFF] mb-1"
                      style={{
                        fontSize: "15px",
                        fontWeight: 500,
                      }}
                    >
                      {entry.label}
                    </div>
                    <div
                      className="text-[#B0BEC5]"
                      style={{ fontSize: "12px" }}
                    >
                      {entry.time}
                    </div>
                  </div>
                </div>
                <div
                  className="px-3 py-1 rounded-full"
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: entry.color,
                    backgroundColor: `${entry.color}15`,
                  }}
                >
                  +{entry.points}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Encouragement Message */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-6 p-4 rounded-lg bg-[#242424] border border-[#81C784]/30"
      >
        <div className="text-[#81C784] mb-1" style={{ fontSize: '14px', fontWeight: 600 }}>
          🌱 훌륭해요!
        </div>
        <div className="text-[#B0BEC5]" style={{ fontSize: '13px', lineHeight: '1.5' }}>
          환경을 생각하는 당신의 운전 습관이 지구를 더 푸르게 만들고 있어요.
        </div>
      </motion.div> */}
    </div>
  );
}