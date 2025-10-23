import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Award, Calendar } from 'lucide-react';

interface PointsManagementScreenProps {
  ecoPoints: number;
}

export function PointsManagementScreen({ ecoPoints }: PointsManagementScreenProps) {
  const weeklyData = [
    { day: '월', points: 145, spent: 30 },
    { day: '화', points: 189, spent: 0 },
    { day: '수', points: 234, spent: 50 },
    { day: '목', points: 198, spent: 0 },
    { day: '금', points: 267, spent: 100 },
    { day: '토', points: 145, spent: 0 },
    { day: '일', points: 156, spent: 0 },
  ];

  const monthlyData = [
    { month: '3월', earned: 1234, spent: 300 },
    { month: '4월', earned: 1567, spent: 450 },
    { month: '5월', earned: 1892, spent: 600 },
    { month: '6월', earned: 2134, spent: 800 },
    { month: '7월', earned: 2456, spent: 500 },
    { month: '8월', earned: 1234, spent: 200 },
  ];

  return (
    <div className="w-full h-full bg-[#121212] overflow-y-auto p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="text-[#FFFFFF] text-4xl mb-3">포인트 관리</div>
          <div className="text-[#B0BEC5] text-lg">에코 포인트 획득 및 사용 내역을 확인하세요</div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card 
            className="bg-gradient-to-br from-[#81C784] to-[#66BB6A] border-none p-6"
            style={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.4)' }}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-white/80 mb-1">총 보유 포인트</div>
                <div className="text-white text-3xl">{ecoPoints.toLocaleString()}</div>
              </div>
            </div>
          </Card>

          <Card 
            className="bg-gradient-to-br from-[#64B5F6] to-[#42A5F5] border-none p-6"
            style={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.4)' }}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-white/80 mb-1">이번 달 획득</div>
                <div className="text-white text-3xl">+1,234</div>
              </div>
            </div>
          </Card>

          <Card 
            className="bg-gradient-to-br from-[#FFD54F] to-[#FFC107] border-none p-6"
            style={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.4)' }}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-white/80 mb-1">이번 달 사용</div>
                <div className="text-white text-3xl">-200</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="mb-6 bg-[#1E1E1E] border border-[#2E2E2E]">
            <TabsTrigger 
              value="weekly" 
              className="data-[state=active]:bg-[#81C784] data-[state=active]:text-white text-[#B0BEC5]"
            >
              주간 리포트
            </TabsTrigger>
            <TabsTrigger 
              value="monthly" 
              className="data-[state=active]:bg-[#81C784] data-[state=active]:text-white text-[#B0BEC5]"
            >
              월간 리포트
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="mt-0">
            <div className="grid grid-cols-2 gap-6">
              <Card 
                className="bg-[#1E1E1E] border-[#2E2E2E] p-6"
                style={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.4)' }}
              >
                <div className="text-[#FFFFFF] text-xl mb-6">주간 포인트 획득</div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" />
                    <XAxis dataKey="day" stroke="#B0BEC5" />
                    <YAxis stroke="#B0BEC5" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E1E1E', 
                        border: '1px solid #2E2E2E',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="points" 
                      stroke="#81C784" 
                      strokeWidth={3} 
                      dot={{ fill: '#81C784', r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card 
                className="bg-[#1E1E1E] border-[#2E2E2E] p-6"
                style={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.4)' }}
              >
                <div className="text-[#FFFFFF] text-xl mb-6">주간 포인트 사용</div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" />
                    <XAxis dataKey="day" stroke="#B0BEC5" />
                    <YAxis stroke="#B0BEC5" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E1E1E', 
                        border: '1px solid #2E2E2E',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }}
                    />
                    <Bar dataKey="spent" fill="#64B5F6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="mt-0">
            <Card 
              className="bg-[#1E1E1E] border-[#2E2E2E] p-6"
              style={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.4)' }}
            >
              <div className="text-[#FFFFFF] text-xl mb-6">월간 포인트 획득 vs 사용</div>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" />
                  <XAxis dataKey="month" stroke="#B0BEC5" />
                  <YAxis stroke="#B0BEC5" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E1E1E', 
                      border: '1px solid #2E2E2E',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }}
                  />
                  <Bar dataKey="earned" fill="#81C784" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="spent" fill="#FFD54F" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Transactions */}
        <Card 
          className="bg-[#1E1E1E] border-[#2E2E2E] p-6 mt-6"
          style={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.4)' }}
        >
          <div className="text-[#FFFFFF] text-xl mb-6">최근 거래 내역</div>
          <div className="space-y-4">
            {[
              { type: '획득', desc: '경제속도 준수 운전', points: '+130', date: '2025.08.14', color: '#81C784' },
              { type: '획득', desc: '정속 주행 20분', points: '+45', date: '2025.08.14', color: '#81C784' },
              { type: '사용', desc: '커피 쿠폰 교환', points: '-300', date: '2025.08.13', color: '#FFD54F' },
              { type: '획득', desc: '친환경 공조 사용', points: '+20', date: '2025.08.13', color: '#81C784' },
              { type: '획득', desc: '에코 드라이빙 완료', points: '+156', date: '2025.08.12', color: '#81C784' },
            ].map((transaction, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-4 rounded-xl bg-[#121212] border border-[#2E2E2E]"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${transaction.color}20` }}
                  >
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: transaction.color }}
                    />
                  </div>
                  <div>
                    <div className="text-[#FFFFFF] mb-1">{transaction.desc}</div>
                    <div className="text-[#B0BEC5] text-sm">{transaction.date}</div>
                  </div>
                </div>
                <div 
                  className="text-2xl"
                  style={{ color: transaction.color }}
                >
                  {transaction.points}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
