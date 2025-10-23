import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Coffee, Zap, Gift, TrendingUp, Calendar, Award } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { toast } from "sonner@2.0.3";
import { motion } from "framer-motion";

interface PointManagementPageProps {
  ecoPoints: number;
  onExchange: (points: number) => void;
}

export function PointManagementPage({
  ecoPoints,
  onExchange,
}: PointManagementPageProps) {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const dailyData = [
    { date: "8/8", points: 98 },
    { date: "8/9", points: 124 },
    { date: "8/10", points: 145 },
    { date: "8/11", points: 132 },
    { date: "8/12", points: 167 },
    { date: "8/13", points: 189 },
    { date: "8/14", points: 210 },
  ];

  const exchangeItems = [
    {
      id: 1,
      icon: Coffee,
      label: "커피 쿠폰",
      pointsRequired: 300,
    },
    {
      id: 2,
      icon: Zap,
      label: "충전 크레딧",
      pointsRequired: 800,
    },
    {
      id: 3,
      icon: Gift,
      label: "기프트 카드",
      pointsRequired: 1000,
    },
  ];

  const transactions = [
    {
      type: "획득",
      desc: "경제속도 준수",
      points: "+130",
      date: "2025.08.14",
      time: "14:23",
      color: "#81C784",
    },
    {
      type: "획득",
      desc: "정속 주행",
      points: "+45",
      date: "2025.08.14",
      time: "13:55",
      color: "#81C784",
    },
    {
      type: "획득",
      desc: "급가속 0회",
      points: "+85",
      date: "2025.08.14",
      time: "13:30",
      color: "#81C784",
    },
    {
      type: "사용",
      desc: "커피 쿠폰",
      points: "-300",
      date: "2025.08.13",
      time: "17:20",
      color: "#FFD54F",
    },
    {
      type: "획득",
      desc: "친환경 공조",
      points: "+20",
      date: "2025.08.13",
      time: "16:10",
      color: "#81C784",
    },
    {
      type: "획득",
      desc: "급감속 0회",
      points: "+85",
      date: "2025.08.13",
      time: "15:45",
      color: "#81C784",
    },
    {
      type: "획득",
      desc: "에코 드라이빙",
      points: "+65",
      date: "2025.08.13",
      time: "14:20",
      color: "#81C784",
    },
    {
      type: "획득",
      desc: "정속 주행",
      points: "+50",
      date: "2025.08.12",
      time: "18:30",
      color: "#81C784",
    },
  ];

  // 통계 계산
  const todayPoints = transactions
    .filter(tx => tx.date === "2025.08.14" && tx.type === "획득")
    .reduce((sum, tx) => sum + parseInt(tx.points), 0);

  const weekPoints = dailyData.reduce((sum, day) => sum + day.points, 0);

  const handleExchange = (item: any) => {
    if (ecoPoints >= item.pointsRequired) {
      setSelectedItem(item);
      setShowConfirm(true);
    } else {
      toast.error("포인트 부족", {
        description: `${item.pointsRequired - ecoPoints} 포인트가 더 필요합니다`,
      });
    }
  };

  const confirmExchange = () => {
    if (selectedItem) {
      onExchange(-selectedItem.pointsRequired);
      toast.success("교환 완료!", {
        description: `${selectedItem.label}를 교환했습니다`,
      });
      setShowConfirm(false);
      setSelectedItem(null);
    }
  };

  return (
    <div
      className="w-full h-full bg-[#121212] overflow-hidden flex flex-col justify-center"
      style={{ padding: "40px 40px 40px 40px" }}
    >
      <div className="mb-4">
        <div
          className="text-[#FFFFFF] mb-1"
          style={{ fontSize: "28px", fontWeight: 500 }}
        >
          포인트 관리
        </div>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList
          className="mb-4 bg-[#1E1E1E] border border-[#2E2E2E]"
          style={{ minHeight: "48px" }}
        >
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-[#81C784] data-[state=active]:text-white text-[#B0BEC5]"
            style={{
              fontSize: "18px",
              minHeight: "44px",
              minWidth: "88px",
              padding: "0 24px",
            }}
          >
            포인트 내역
          </TabsTrigger>
          <TabsTrigger
            value="exchange"
            className="data-[state=active]:bg-[#81C784] data-[state=active]:text-white text-[#B0BEC5]"
            style={{
              fontSize: "18px",
              minHeight: "44px",
              minWidth: "88px",
              padding: "0 24px",
            }}
          >
            포인트 교환
          </TabsTrigger>
        </TabsList>

        {/* 포인트 내역 + 리포트 통합 탭 */}
        <TabsContent value="history" className="mt-0 space-y-4">
          {/* 상단 통계 카드 3개 - 컴팩트 */}
          <div className="grid grid-cols-3 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card
                className="bg-gradient-to-br from-[#81C784] to-[#66BB6A] border-none p-5 relative overflow-hidden flex flex-col justify-center"
                style={{
                  boxShadow: "0px 4px 16px rgba(129,199,132,0.3)",
                  height: "106px"
                }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-white opacity-90" />
                    <div
                      className="text-white opacity-90"
                      style={{ fontSize: "14px" }}
                    >
                      현재 보유
                    </div>
                  </div>
                  <div
                    className="text-white mb-0.5"
                    style={{ fontSize: "36px", fontWeight: 700, lineHeight: "1" }}
                  >
                    {ecoPoints.toLocaleString()}
                  </div>
                  <div
                    className="text-white opacity-80"
                    style={{ fontSize: "13px" }}
                  >
                    ECO POINTS
                  </div>
                </div>
                <div className="absolute -right-3 -bottom-3 w-28 h-28 rounded-full bg-white opacity-10" />
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card
                className="bg-[#1E1E1E] border-[#2E2E2E] p-5 relative overflow-hidden flex flex-col justify-center"
                style={{
                  boxShadow: "0px 3px 10px rgba(0,0,0,0.3)",
                  height: "106px"
                }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-[#64B5F6]" />
                    <div
                      className="text-[#B0BEC5]"
                      style={{ fontSize: "14px" }}
                    >
                      오늘 적립
                    </div>
                  </div>
                  <div
                    className="text-[#64B5F6] mb-0.5"
                    style={{ fontSize: "36px", fontWeight: 700, lineHeight: "1" }}
                  >
                    +{todayPoints}
                  </div>
                  <div
                    className="text-[#B0BEC5]"
                    style={{ fontSize: "13px" }}
                  >
                    2025.08.14
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card
                className="bg-[#1E1E1E] border-[#2E2E2E] p-5 relative overflow-hidden flex flex-col justify-center"
                style={{
                  boxShadow: "0px 3px 10px rgba(0,0,0,0.3)",
                  height: "106px"
                }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-[#A5D6A7]" />
                    <div
                      className="text-[#B0BEC5]"
                      style={{ fontSize: "14px" }}
                    >
                      이번 주 적립
                    </div>
                  </div>
                  <div
                    className="text-[#A5D6A7] mb-0.5"
                    style={{ fontSize: "36px", fontWeight: 700, lineHeight: "1" }}
                  >
                    +{weekPoints}
                  </div>
                  <div
                    className="text-[#B0BEC5]"
                    style={{ fontSize: "13px" }}
                  >
                    8/8 ~ 8/14
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* 하단 2열 레이아웃: 거래 내역 + 차트 */}
          <div className="grid grid-cols-2 gap-5">
            {/* 최근 거래 내역 - 왼쪽 */}
            <Card
              className="bg-[#1E1E1E] border-[#2E2E2E] p-5 flex flex-col"
              style={{
                boxShadow: "0px 3px 10px rgba(0,0,0,0.3)",
                height: "350px"
              }}
            >
              <div
                className="text-[#FFFFFF] mb-3 flex items-center justify-between"
                style={{ fontSize: "18px" }}
              >
                <span>최근 거래 내역</span>
                <span className="text-[#B0BEC5]" style={{ fontSize: "13px" }}>
                  총 {transactions.length}건
                </span>
              </div>
              <div className="space-y-1.5 overflow-y-auto flex-1">
                {transactions.slice(0, 6).map((tx, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#242424] hover:bg-[#2A2A2A] transition-colors border border-[#2E2E2E]"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="px-2.5 py-1 rounded-full text-center"
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          backgroundColor: tx.type === "획득" ? "#81C78420" : "#FFD54F20",
                          color: tx.type === "획득" ? "#81C784" : "#FFD54F",
                          minWidth: "48px"
                        }}
                      >
                        {tx.type}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[#FFFFFF]" style={{ fontSize: "15px", fontWeight: 500 }}>
                          {tx.desc}
                        </div>
                        <div className="text-[#B0BEC5]" style={{ fontSize: "12px" }}>
                          {tx.date} {tx.time}
                        </div>
                      </div>
                    </div>
                    <div
                      className="px-3 py-1.5 rounded-full"
                      style={{
                        color: tx.color,
                        fontSize: "17px",
                        fontWeight: 700,
                        backgroundColor: `${tx.color}15`
                      }}
                    >
                      {tx.points}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* 일별 적립 추이 차트 - 오른쪽 */}
            <Card
              className="bg-[#1E1E1E] border-[#2E2E2E] p-5 flex flex-col"
              style={{
                boxShadow: "0px 3px 10px rgba(0,0,0,0.3)",
                height: "350px"
              }}
            >
              <div
                className="text-[#FFFFFF] mb-3"
                style={{ fontSize: "18px" }}
              >
                일별 적립 추이
              </div>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#2E2E2E"
                    />
                    <XAxis
                      dataKey="date"
                      stroke="#B0BEC5"
                      style={{ fontSize: "13px" }}
                    />
                    <YAxis
                      stroke="#B0BEC5"
                      style={{ fontSize: "13px" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1E1E1E",
                        border: "1px solid #2E2E2E",
                        borderRadius: "8px",
                        color: "#FFFFFF",
                        fontSize: "14px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="points"
                      stroke="#64B5F6"
                      strokeWidth={2.5}
                      dot={{ fill: "#64B5F6", r: 4 }}
                      activeDot={{ r: 6, fill: "#64B5F6" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* 포인트 교환 탭 */}
        <TabsContent value="exchange" className="mt-0">
          <div
            className="grid grid-cols-3 gap-6"
          >
            {exchangeItems.map((item) => {
              const Icon = item.icon;
              const canAfford =
                ecoPoints >= item.pointsRequired;

              return (
                <Card
                  key={item.id}
                  className={`bg-[#1E1E1E] border-[#2E2E2E] p-5 ${canAfford ? "hover:border-[#81C784] cursor-pointer" : "opacity-50"}`}
                  style={{
                    boxShadow: "0px 3px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="flex flex-col items-center justify-center text-center h-full">
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center mb-3 ${
                        canAfford
                          ? "bg-gradient-to-br from-[#81C784] to-[#64B5F6]"
                          : "bg-[#2E2E2E]"
                      }`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div
                      className="text-[#FFFFFF] mb-2"
                      style={{ fontSize: "18px" }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="text-[#64B5F6] mb-4"
                      style={{
                        fontSize: "24px",
                        fontWeight: 500,
                      }}
                    >
                      {item.pointsRequired}
                    </div>
                    <Button
                      onClick={() => handleExchange(item)}
                      disabled={!canAfford}
                      className={`w-full ${canAfford ? "bg-[#81C784] hover:bg-[#66BB6A]" : "bg-[#2E2E2E] cursor-not-allowed"}`}
                      style={{
                        fontSize: "18px",
                        minHeight: "44px",
                      }}
                    >
                      {canAfford ? "교환" : "부족"}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      <AlertDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
      >
        <AlertDialogContent className="bg-[#1E1E1E] border-[#2E2E2E]">
          <AlertDialogHeader>
            <AlertDialogTitle
              className="text-[#FFFFFF]"
              style={{ fontSize: "24px" }}
            >
              교환 ���인
            </AlertDialogTitle>
            <AlertDialogDescription
              className="text-[#B0BEC5]"
              style={{ fontSize: "16px" }}
            >
              {selectedItem &&
                `${selectedItem.pointsRequired} 포인트를 사용하여 ${selectedItem.label}로 교환하시겠습니까?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-[#121212] border-[#2E2E2E] text-[#B0BEC5]"
              style={{
                fontSize: "18px",
                minHeight: "44px",
                minWidth: "88px",
              }}
            >
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmExchange}
              className="bg-[#81C784] hover:bg-[#66BB6A]"
              style={{
                fontSize: "18px",
                minHeight: "44px",
                minWidth: "88px",
              }}
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}