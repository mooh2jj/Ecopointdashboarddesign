import { Cloud, CloudRain, Sun, CloudSnow } from 'lucide-react';

export function Header() {
  const date = new Date();
  const weekday = date.toLocaleDateString('ko-KR', { weekday: 'long' });
  const dateStr = date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  const time = date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

  // Mock weather data
  const weather = {
    condition: 'partly-cloudy',
    temp: 18,
    location: 'Seoul'
  };

  const WeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun className="w-7 h-7" />;
      case 'rainy':
        return <CloudRain className="w-7 h-7" />;
      case 'snowy':
        return <CloudSnow className="w-7 h-7" />;
      default:
        return <Cloud className="w-7 h-7" />;
    }
  };

  return (
    <header 
      className="absolute top-0 left-0 right-0 h-20 px-12 flex items-center justify-between z-20 bg-white/80 backdrop-blur-sm"
      style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}
    >
      {/* Left - Logo */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#2196F3] flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" fill="white" fillOpacity="0.9"/>
            <path d="M12 8C10.34 8 9 9.34 9 11C9 12.66 10.34 14 12 14C13.66 14 15 12.66 15 11C15 9.34 13.66 8 12 8Z" fill="#4CAF50"/>
          </svg>
        </div>
        <div className="text-[#4CAF50] text-3xl">Eco Point</div>
      </div>

      {/* Right - Weather & Date */}
      <div className="flex items-center gap-8">
        <div className="text-right">
          <div className="text-[#212121] text-xl">{weekday}</div>
          <div className="text-[#757575]">{dateStr}</div>
        </div>
        
        <div 
          className="flex items-center gap-4 bg-white rounded-2xl px-6 py-3 border border-[#E0E0E0]"
          style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}
        >
          <div className="text-[#4CAF50]">
            <WeatherIcon />
          </div>
          <div>
            <div className="text-[#212121] text-2xl">{weather.temp}°C</div>
            <div className="text-[#757575] text-sm">{time}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
