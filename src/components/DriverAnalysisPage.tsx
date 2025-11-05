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
import {
  ThumbsUp,
  Leaf,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export function DriverAnalysisPage() {
  const patternData = [
    { name: "가속", negative: 3, positive: 2 },
    { name: "감속", negative: 5, positive: 3 },
    { name: "출발", negative: 1, positive: 4 },
    { name: "정지", negative: 2, positive: 3 },
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
      text: "경제속도 유지율 85%, 연비 효율 향상!",
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
      style={{ padding: "40px 40px 40px 40px" }}
    >
      <div className="mb-5 flex items-center gap-6">
        <div
          className="text-[#FFFFFF] flex-shrink-0"
          style={{ fontSize: "28px", fontWeight: 500 }}
        >
          운전자 분석
        </div>

        {/* Feedback Cards */}
        <div className="flex gap-4 flex-1">
          {feedbackCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                className="flex-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: idx * 0.1,
                  duration: 0.6,
                  ease: [0.645, 0.045, 0.355, 1.0],
                }}
              >
                <Card
                  className="bg-[#1E1E1E] border-[#2E2E2E] p-4 h-full"
                  style={{
                    boxShadow: "0px 3px 10px rgba(0,0,0,0.3)",
                    borderLeft: `3px solid ${card.color}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: `${card.color}20`,
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: card.color }}
                      />
                    </div>
                    <div
                      className="text-[#B0BEC5] leading-relaxed"
                      style={{ fontSize: "14px" }}
                    >
                      {card.text}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
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
            운전 패턴 분석 (8월 14일 목요일 ~ 8월 20일 수요일)
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart
              data={patternData}
              barSize={30}
              margin={{
                left: 10,
                right: 40,
                top: 5,
                bottom: 5,
              }}
            >
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
                ticks={[0, 5, 10]}
                domain={[0, 10]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E1E1E",
                  border: "1px solid #2E2E2E",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "14px" }}
                iconType="square"
              />
              <Bar
                dataKey="negative"
                fill="#EF5350"
                radius={[6, 6, 0, 0]}
                name="negative 이벤트"
              />
              <Bar
                dataKey="positive"
                fill="#64B5F6"
                radius={[6, 6, 0, 0]}
                name="positive 이벤트"
              />
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

      {/* Lottie Animation Placeholder */}
      <div>
        <Card
          className="bg-[#1E1E1E] border-[#2E2E2E] p-6"
          style={{
            boxShadow: "0px 3px 10px rgba(0,0,0,0.3)",
          }}
        >
          {(() => {
            const RecentDrivingRecord = () => {
              // Mock data for driving records
              const drivingData: Record<
                string,
                {
                  distance: number;
                  time: number;
                  points: number;
                  delta: number;
                }
              > = {
                "2025-11-03": {
                  distance: 45.2,
                  time: 85,
                  points: 180,
                  delta: 5,
                },
                "2025-11-04": {
                  distance: 32.8,
                  time: 62,
                  points: 165,
                  delta: -3,
                },
                "2025-11-05": {
                  distance: 51.3,
                  time: 95,
                  points: 190,
                  delta: 8,
                },
                "2025-11-01": {
                  distance: 28.5,
                  time: 55,
                  points: 155,
                  delta: 2,
                },
                "2025-11-02": {
                  distance: 39.7,
                  time: 72,
                  points: 172,
                  delta: -5,
                },
              };

              const [selectedDate, setSelectedDate] = useState(
                new Date(2025, 10, 5),
              ); // Nov 5, 2025
              const [weekOffset, setWeekOffset] = useState(0);

              // Get start of week (Sunday)
              const getWeekStart = (
                date: Date,
                offset: number,
              ) => {
                const d = new Date(date);
                d.setDate(d.getDate() + offset * 7);
                const day = d.getDay();
                const diff = d.getDate() - day;
                return new Date(d.setDate(diff));
              };

              const weekStart = getWeekStart(
                new Date(2025, 10, 5),
                weekOffset,
              );
              const weekDays = Array.from(
                { length: 7 },
                (_, i) => {
                  const date = new Date(weekStart);
                  date.setDate(weekStart.getDate() + i);
                  return date;
                },
              );

              const dayLabels = [
                "일",
                "월",
                "화",
                "수",
                "목",
                "금",
                "토",
              ];

              const formatDateKey = (date: Date) => {
                return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
              };

              const selectedData = drivingData[
                formatDateKey(selectedDate)
              ] || {
                distance: 0,
                time: 0,
                points: 0,
                delta: 0,
              };

              return (
                <div className="w-full">
                  <div
                    className="text-[#FFFFFF] mb-4"
                    style={{ fontSize: "20px" }}
                  >
                    최근 주행기록
                  </div>

                  {/* Weekly Calendar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <button
                        onClick={() =>
                          setWeekOffset(weekOffset - 1)
                        }
                        className="w-[44px] h-[44px] flex items-center justify-center rounded-lg bg-[#2E2E2E] hover:bg-[#3E3E3E] transition-colors"
                        style={{
                          minWidth: "44px",
                          minHeight: "44px",
                        }}
                      >
                        <ChevronLeft
                          size={24}
                          color="#81C784"
                        />
                      </button>

                      <div className="flex gap-2">
                        {weekDays.map((date, index) => {
                          const dateKey = formatDateKey(date);
                          const hasData =
                            !!drivingData[dateKey];
                          const isSelected =
                            formatDateKey(date) ===
                            formatDateKey(selectedDate);

                          return (
                            <button
                              key={index}
                              onClick={() =>
                                setSelectedDate(date)
                              }
                              className="flex flex-col items-center justify-center rounded-lg transition-all"
                              style={{
                                width: "64px",
                                height: "64px",
                                minWidth: "64px",
                                minHeight: "64px",
                                backgroundColor: isSelected
                                  ? "#81C784"
                                  : "#2E2E2E",
                                border: isSelected
                                  ? "2px solid #81C784"
                                  : "2px solid transparent",
                              }}
                            >
                              <div
                                className={
                                  isSelected
                                    ? "text-[#121212]"
                                    : "text-[#B0BEC5]"
                                }
                                style={{ fontSize: "12px" }}
                              >
                                {dayLabels[index]}
                              </div>
                              <div
                                className={
                                  isSelected
                                    ? "text-[#121212]"
                                    : "text-[#FFFFFF]"
                                }
                                style={{
                                  fontSize: "16px",
                                  marginTop: "2px",
                                }}
                              >
                                {date.getDate()}
                              </div>
                              {hasData && (
                                <div
                                  className="rounded-full mt-1"
                                  style={{
                                    width: "6px",
                                    height: "6px",
                                    backgroundColor: isSelected
                                      ? "#121212"
                                      : "#81C784",
                                  }}
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() =>
                          setWeekOffset(weekOffset + 1)
                        }
                        className="w-[44px] h-[44px] flex items-center justify-center rounded-lg bg-[#2E2E2E] hover:bg-[#3E3E3E] transition-colors"
                        style={{
                          minWidth: "44px",
                          minHeight: "44px",
                        }}
                      >
                        <ChevronRight
                          size={24}
                          color="#81C784"
                        />
                      </button>
                    </div>
                  </div>

                  {/* Selected Date Summary */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Distance */}
                    <div className="bg-[#2E2E2E] rounded-lg p-4">
                      <div
                        className="text-[#B0BEC5] mb-2"
                        style={{ fontSize: "14px" }}
                      >
                        주행거리
                      </div>
                      <div className="flex items-center justify-between">
                        <div
                          className="text-[#FFFFFF]"
                          style={{ fontSize: "24px" }}
                        >
                          {selectedData.distance.toFixed(1)}
                          <span
                            className="text-[#B0BEC5] ml-1"
                            style={{ fontSize: "16px" }}
                          >
                            km
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="bg-[#2E2E2E] rounded-lg p-4">
                      <div
                        className="text-[#B0BEC5] mb-2"
                        style={{ fontSize: "14px" }}
                      >
                        주행시간
                      </div>
                      <div className="flex items-center justify-between">
                        <div
                          className="text-[#FFFFFF]"
                          style={{ fontSize: "24px" }}
                        >
                          {selectedData.time}
                          <span
                            className="text-[#B0BEC5] ml-1"
                            style={{ fontSize: "16px" }}
                          >
                            분
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Eco Points */}
                    <div className="bg-[#2E2E2E] rounded-lg p-4">
                      <div
                        className="text-[#B0BEC5] mb-2"
                        style={{ fontSize: "14px" }}
                      >
                        에코포인트
                      </div>
                      <div className="flex items-center justify-between">
                        <div
                          className="text-[#FFFFFF]"
                          style={{ fontSize: "24px" }}
                        >
                          {selectedData.points}
                          <span
                            className="text-[#B0BEC5] ml-1"
                            style={{ fontSize: "16px" }}
                          >
                            P
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {selectedData.delta > 0 ? (
                            <>
                              <TrendingUp
                                size={20}
                                color="#81C784"
                              />
                              <span
                                className="text-[#81C784]"
                                style={{ fontSize: "16px" }}
                              >
                                +{selectedData.delta}
                              </span>
                            </>
                          ) : selectedData.delta < 0 ? (
                            <>
                              <TrendingDown
                                size={20}
                                color="#FF6B6B"
                              />
                              <span
                                className="text-[#FF6B6B]"
                                style={{ fontSize: "16px" }}
                              >
                                {selectedData.delta}
                              </span>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            };

            return <RecentDrivingRecord />;
          })()}
        </Card>
      </div>
    </div>
  );
}