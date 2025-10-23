import { Header } from './Header';
import { NavigationBar } from './NavigationBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Zap, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface StatsScreenProps {
  ecoPoints: number;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function StatsScreen({ ecoPoints, activeTab, onTabChange }: StatsScreenProps) {
  const dailyData = [
    { time: '08:00', points: 45 },
    { time: '10:00', points: 78 },
    { time: '12:00', points: 120 },
    { time: '14:00', points: 95 },
    { time: '16:00', points: 145 },
    { time: '18:00', points: 178 },
    { time: '20:00', points: 210 },
  ];

  const weeklyData = [
    { day: 'Mon', points: 145 },
    { day: 'Tue', points: 189 },
    { day: 'Wed', points: 234 },
    { day: 'Thu', points: 198 },
    { day: 'Fri', points: 267 },
    { day: 'Sat', points: 145 },
    { day: 'Sun', points: 156 },
  ];

  const drivingScore = 85;

  return (
    <div className="w-full h-full relative">
      <Header />

      <div className="absolute top-20 bottom-[100px] left-0 right-0 overflow-y-auto">
        <div className="p-8">
          {/* Title */}
          <div className="mb-6">
            <div className="text-[#212121] text-3xl mb-2">Eco Point Detail & Report</div>
            <div className="text-[#757575]">Track your eco-friendly driving performance</div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="mb-6 bg-white border border-[#E0E0E0]">
              <TabsTrigger value="daily" className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white">
                Daily
              </TabsTrigger>
              <TabsTrigger value="weekly" className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white">
                Weekly
              </TabsTrigger>
              <TabsTrigger value="monthly" className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white">
                Monthly
              </TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-3 gap-6">
              {/* Left Column - Charts */}
              <div className="col-span-2 space-y-6">
                <TabsContent value="daily" className="mt-0">
                  <Card className="p-6 bg-white border-[#E0E0E0]" style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
                    <div className="text-[#212121] text-xl mb-4">Daily Eco Points</div>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={dailyData}>
                        <defs>
                          <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                        <XAxis dataKey="time" stroke="#757575" />
                        <YAxis stroke="#757575" />
                        <Tooltip />
                        <Area type="monotone" dataKey="points" stroke="#4CAF50" strokeWidth={3} fill="url(#colorPoints)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Card>
                </TabsContent>

                <TabsContent value="weekly" className="mt-0">
                  <Card className="p-6 bg-white border-[#E0E0E0]" style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
                    <div className="text-[#212121] text-xl mb-4">Weekly Eco Points</div>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                        <XAxis dataKey="day" stroke="#757575" />
                        <YAxis stroke="#757575" />
                        <Tooltip />
                        <Line type="monotone" dataKey="points" stroke="#2196F3" strokeWidth={3} dot={{ fill: '#2196F3', r: 5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>
                </TabsContent>

                <TabsContent value="monthly" className="mt-0">
                  <Card className="p-6 bg-white border-[#E0E0E0]" style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
                    <div className="text-[#212121] text-xl mb-4">Monthly Overview</div>
                    <div className="text-[#757575] text-center py-12">Monthly data visualization coming soon...</div>
                  </Card>
                </TabsContent>

                {/* Driving Pattern Analysis */}
                <Card className="p-6 bg-white border-[#E0E0E0]" style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
                  <div className="text-[#212121] text-xl mb-4">Driving Pattern Analysis</div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#4CAF50]" />
                        <span className="text-[#212121]">Acceleration</span>
                      </div>
                      <div className="text-[#4CAF50]">Excellent</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#FFB300]" />
                        <span className="text-[#212121]">Braking</span>
                      </div>
                      <div className="text-[#FFB300]">Good</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#E53935]" />
                        <span className="text-[#212121]">Idling</span>
                      </div>
                      <div className="text-[#E53935]">Needs Improvement</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column - Driving Score */}
              <div className="space-y-6">
                <Card className="p-6 bg-gradient-to-br from-[#4CAF50] to-[#2196F3] text-white" style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
                  <div className="text-white/90 mb-2">Driving Score</div>
                  <div className="relative w-40 h-40 mx-auto my-6">
                    <svg className="transform -rotate-90" viewBox="0 0 160 160">
                      <circle cx="80" cy="80" r="70" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="12" />
                      <circle 
                        cx="80" 
                        cy="80" 
                        r="70" 
                        fill="none" 
                        stroke="white" 
                        strokeWidth="12"
                        strokeDasharray={`${(drivingScore / 100) * 440} 440`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <div className="text-5xl">{drivingScore}</div>
                      <div className="text-white/80">/ 100</div>
                    </div>
                  </div>
                  <div className="text-center text-white/90">Keep up the great work!</div>
                </Card>

                <Card className="p-6 bg-white border-[#E0E0E0]" style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
                  <div className="text-[#212121] text-xl mb-4">Quick Stats</div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#4CAF50]/20 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-[#4CAF50]" />
                      </div>
                      <div>
                        <div className="text-[#757575] text-sm">Total Points</div>
                        <div className="text-[#212121]">{ecoPoints}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#2196F3]/20 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-[#2196F3]" />
                      </div>
                      <div>
                        <div className="text-[#757575] text-sm">Avg. Daily</div>
                        <div className="text-[#212121]">176 pts</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FFB300]/20 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-[#FFB300]" />
                      </div>
                      <div>
                        <div className="text-[#757575] text-sm">Drive Time</div>
                        <div className="text-[#212121]">24.5 hrs</div>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="space-y-3">
                  <Button className="w-full bg-[#2196F3] hover:bg-[#1976D2] text-white" style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
                    View Report
                  </Button>
                  <Button className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white" style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
                    Share My Score
                  </Button>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>

      <NavigationBar activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
