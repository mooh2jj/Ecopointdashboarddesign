import { Header } from './Header';
import { NavigationBar } from './NavigationBar';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Award, Car, Calendar, MapPin } from 'lucide-react';

interface ProfileScreenProps {
  ecoPoints: number;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function ProfileScreen({ ecoPoints, activeTab, onTabChange }: ProfileScreenProps) {
  const achievements = [
    { id: 1, name: 'Eco Beginner', icon: '🌱', earned: true },
    { id: 2, name: 'Green Driver', icon: '🚗', earned: true },
    { id: 3, name: 'Earth Guardian', icon: '🌍', earned: true },
    { id: 4, name: 'Eco Master', icon: '🏆', earned: false },
  ];

  return (
    <div className="w-full h-full relative">
      <Header />

      <div className="absolute top-20 bottom-[100px] left-0 right-0 overflow-y-auto">
        <div className="p-8">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Profile Info */}
            <div className="col-span-1 space-y-6">
              <Card className="p-6 bg-white border-[#E0E0E0]" style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-br from-[#4CAF50] to-[#2196F3] text-white text-3xl">
                      EK
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-[#212121] text-2xl mb-1">Eco Driver Kim</div>
                  <div className="text-[#757575] mb-4">eco.driver@email.com</div>
                  <Badge className="bg-[#4CAF50] text-white mb-2">Level 5 Driver</Badge>
                  <div className="text-[#2196F3] text-xl">{ecoPoints} Points</div>
                </div>
              </Card>

              <Card className="p-6 bg-white border-[#E0E0E0]" style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
                <div className="text-[#212121] text-xl mb-4">Driving Stats</div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-[#4CAF50]" />
                    <div className="flex-1">
                      <div className="text-[#757575] text-sm">Total Trips</div>
                      <div className="text-[#212121]">248</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#2196F3]" />
                    <div className="flex-1">
                      <div className="text-[#757575] text-sm">Days Active</div>
                      <div className="text-[#212121]">87</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#FFB300]" />
                    <div className="flex-1">
                      <div className="text-[#757575] text-sm">Distance</div>
                      <div className="text-[#212121]">4,562 km</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Achievements & Activity */}
            <div className="col-span-2 space-y-6">
              <Card className="p-6 bg-white border-[#E0E0E0]" style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-6 h-6 text-[#4CAF50]" />
                  <div className="text-[#212121] text-2xl">Achievements</div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        achievement.earned
                          ? 'border-[#4CAF50] bg-[#4CAF50]/10'
                          : 'border-[#E0E0E0] bg-white opacity-50'
                      }`}
                    >
                      <div className="text-4xl mb-2">{achievement.icon}</div>
                      <div className={`text-sm ${achievement.earned ? 'text-[#212121]' : 'text-[#9E9E9E]'}`}>
                        {achievement.name}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-white border-[#E0E0E0]" style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
                <div className="text-[#212121] text-2xl mb-6">Recent Activity</div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b border-[#E0E0E0]">
                    <div className="w-12 h-12 rounded-full bg-[#4CAF50]/20 flex items-center justify-center">
                      <Award className="w-6 h-6 text-[#4CAF50]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[#212121]">Earned Earth Guardian Badge</div>
                      <div className="text-[#757575] text-sm">2 days ago</div>
                    </div>
                    <div className="text-[#4CAF50]">+100 pts</div>
                  </div>

                  <div className="flex items-center gap-4 pb-4 border-b border-[#E0E0E0]">
                    <div className="w-12 h-12 rounded-full bg-[#2196F3]/20 flex items-center justify-center">
                      <Car className="w-6 h-6 text-[#2196F3]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[#212121]">Completed eco-friendly trip</div>
                      <div className="text-[#757575] text-sm">3 days ago</div>
                    </div>
                    <div className="text-[#4CAF50]">+45 pts</div>
                  </div>

                  <div className="flex items-center gap-4 pb-4 border-b border-[#E0E0E0]">
                    <div className="w-12 h-12 rounded-full bg-[#FFB300]/20 flex items-center justify-center">
                      <Award className="w-6 h-6 text-[#FFB300]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[#212121]">Redeemed Coffee Coupon</div>
                      <div className="text-[#757575] text-sm">5 days ago</div>
                    </div>
                    <div className="text-[#E53935]">-300 pts</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-[#4CAF50] to-[#2196F3] text-white" style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
                <div className="text-2xl mb-2">Environmental Impact</div>
                <div className="text-white/80 mb-6">Your contribution to a greener planet</div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🌳</div>
                    <div className="text-3xl mb-1">12</div>
                    <div className="text-white/80 text-sm">Trees Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">💨</div>
                    <div className="text-3xl mb-1">45kg</div>
                    <div className="text-white/80 text-sm">CO₂ Reduced</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">⚡</div>
                    <div className="text-3xl mb-1">156L</div>
                    <div className="text-white/80 text-sm">Fuel Saved</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <NavigationBar activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
