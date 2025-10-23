import { Card } from "./ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ThumbsUp, Leaf, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

export function DriverAnalysisPage() {
  const patternData = [
    { name: "급가속", value: 3, color: "#EF5350" },
    { name: "급감속", value: 5, color: "#EF5350" },
    { name: "공회전", value: 2, color: "#FFC107" },
    { name: "급출발", value: 1, color: "#81C784" },
    { name: "급정지", value: 2, color: "#E53935" },
  ];

  const trendData = [
    { date: "8/14", ecoPoints: 120, avgSpeed: 62 },
    { date: "8/15", ecoPoints: 135, avgSpeed: 65 },
    { date: "8/16", ecoPoints: 150, avgSpeed: 67 },
    { date: "8/17", ecoPoints: 140, avgSpeed: 70 },
    { date: "8/18", ecoPoints: 160, avgSpeed: 72 },
    { date: "8/19", ecoPoints: 175, avgSpeed: 73 },
    { date: "8/20", ecoPoints: 180, avgSpeed: 74 },
  ];

  const feedbackCards = [
    {
      icon: ThumbsUp,
      text: "급가속 3회 감소, 매우 안정적 운전 유지!",
      color: "#81C784",
    },
    {
      icon: Leaf,
      text: "공회전 시간 12% 개선, 에너지 절약 우수!",
      color: "#64B5F6",
    },
    {
      icon: AlertTriangle,
      text: "급감속 5회 발생 — 부드러운 제동 필요",
      color: "#FFC107",
    },
  ];

  return (
    <div
      className="w-full h-full bg-[#121212] overflow-y-auto"
      style={{ padding: "80px 40px 40px 40px" }}
    >
      <div className="mb-5 flex items-center justify-between">
        <div
          className="text-[#FFFFFF]"
          style={{ fontSize: "28px", fontWeight: 500 }}
        >
          운전자 분석
        </div>
        <div
          className="text-[#B0BEC5]"
          style={{ fontSize: "16px" }}
        >
          (2025.08.14 ~ 2025.08.20)
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Pattern Chart */}
        <Card
          className="bg-[#1E1E1E] border-[#2E2E2E] p-3"
          style={{
            boxShadow: "0px 3px 10px rgba(0,0,0,0.3)",
            maxHeight: "250px",
          }}
        >
          <div
            className="text-[#FFFFFF] mb-3"
            style={{ fontSize: "20px" }}
          >
            운전 패턴 분석
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={patternData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#2E2E2E"
              />
              <XAxis
                dataKey="name"
                stroke="#B0BEC5"
                style={{ fontSize: "14px" }}
              />
              <YAxis
                stroke="#B0BEC5"
                style={{ fontSize: "14px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E1E1E",
                  border: "1px solid #2E2E2E",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {patternData.map((entry, index) => (
                  <Bar
                    key={index}
                    dataKey="value"
                    fill={entry.color}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Trend Chart */}
        <Card
          className="bg-[#1E1E1E] border-[#2E2E2E] p-3"
          style={{
            boxShadow: "0px 3px 10px rgba(0,0,0,0.3)",
            maxHeight: "250px",
          }}
        >
          <div
            className="text-[#FFFFFF] mb-3"
            style={{ fontSize: "20px" }}
          >
            에코 포인트 / 평균 속도 추이
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={trendData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#2E2E2E"
              />
              <XAxis
                dataKey="date"
                stroke="#B0BEC5"
                style={{ fontSize: "14px" }}
              />
              <YAxis
                yAxisId="left"
                stroke="#81C784"
                style={{ fontSize: "14px" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#64B5F6"
                style={{ fontSize: "14px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E1E1E",
                  border: "1px solid #2E2E2E",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "14px" }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="ecoPoints"
                stroke="#81C784"
                strokeWidth={2.5}
                name="에코 포인트"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avgSpeed"
                stroke="#64B5F6"
                strokeWidth={2.5}
                name="평균 속도 (km/h)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Feedback Cards */}
      <div
        className="grid grid-cols-3 gap-6 mb-6"
        style={{ maxHeight: "180px" }}
      >
        {feedbackCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.1,
                duration: 0.6,
                ease: [0.645, 0.045, 0.355, 1.0],
              }}
            >
              <Card
                className="bg-[#1E1E1E] border-[#2E2E2E] p-5 h-full"
                style={{
                  boxShadow: "0px 3px 10px rgba(0,0,0,0.3)",
                  borderLeft: `3px solid ${card.color}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: `${card.color}20`,
                    }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: card.color }}
                    />
                  </div>
                  <div
                    className="text-[#B0BEC5] leading-relaxed"
                    style={{ fontSize: "16px" }}
                  >
                    {card.text}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Lottie Animation Placeholder */}
      <div>
        <Card
          className="bg-[#1E1E1E] border-[#2E2E2E] p-6 flex items-center justify-center"
          style={{
            boxShadow: "0px 3px 10px rgba(0,0,0,0.3)",
            maxHeight: "160px",
          }}
        >
          <div className="text-center">
            <motion.div
              className="w-25 h-25 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#81C784]/20 to-[#64B5F6]/20 flex items-center justify-center"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: [0.645, 0.045, 0.355, 1.0],
              }}
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.circle
                  cx="32"
                  cy="32"
                  r="24"
                  stroke="#81C784"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: [0.645, 0.045, 0.355, 1.0],
                  }}
                />
                <motion.path
                  d="M20 32 L28 40 L44 24"
                  stroke="#64B5F6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5,
                    repeat: Infinity,
                    ease: [0.645, 0.045, 0.355, 1.0],
                  }}
                />
              </svg>
            </motion.div>
            <div
              className="text-[#FFFFFF] mb-1"
              style={{ fontSize: "20px" }}
            >
              운전 분석 대시보드
            </div>
            <div
              className="text-[#B0BEC5]"
              style={{ fontSize: "16px" }}
            >
              안전하고 경제적인 운전을 실천하고 있습니다
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}