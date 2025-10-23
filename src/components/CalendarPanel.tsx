import { Calendar } from './ui/calendar';
import { Card } from './ui/card';
import { useState } from 'react';

interface CalendarPanelProps {
  ecoPoints: number;
}

export function CalendarPanel({ ecoPoints }: CalendarPanelProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div 
      className="absolute top-8 right-8 w-[380px] bg-[#1E1E1E] rounded-2xl p-6"
      style={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.4)' }}
    >
      {/* Calendar */}
      <div className="mb-6">
        <div className="text-[#FFFFFF] text-xl mb-4">2025년 8월</div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-xl border-none"
          classNames={{
            months: "flex flex-col",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-[#FFFFFF]",
            nav: "space-x-1 flex items-center",
            nav_button: "h-7 w-7 bg-transparent p-0 text-[#B0BEC5] hover:text-[#FFFFFF]",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-[#B0BEC5] rounded-md w-9 text-sm",
            row: "flex w-full mt-2",
            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-[#64B5F6]/20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: "h-9 w-9 p-0 text-[#FFFFFF] hover:bg-[#64B5F6]/30 rounded-md transition-colors",
            day_selected: "bg-[#64B5F6] text-white hover:bg-[#64B5F6] hover:text-white focus:bg-[#64B5F6] focus:text-white",
            day_today: "bg-[#81C784]/20 text-[#81C784]",
            day_outside: "text-[#B0BEC5]/30",
            day_disabled: "text-[#B0BEC5]/30",
            day_hidden: "invisible",
          }}
        />
      </div>

      {/* Daily Summary */}
      <Card className="bg-[#121212] border-[#2E2E2E] p-5">
        <div className="text-[#FFFFFF] text-lg mb-4">일별 에코포인트 요약</div>
        <div className="space-y-3 text-[#B0BEC5]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#81C784]" />
              <span>정속주행 : 20분</span>
            </div>
            <span className="text-[#81C784]">+20</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#64B5F6]" />
              <span>경제주행 : 50분</span>
            </div>
            <span className="text-[#64B5F6]">+50</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FFD54F]" />
              <span>친환경 공조 : 40분</span>
            </div>
            <span className="text-[#FFD54F]">+20</span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-[#2E2E2E] flex items-center justify-between">
          <span className="text-[#FFFFFF]">오늘 총 포인트</span>
          <span className="text-[#81C784] text-xl">+90</span>
        </div>
      </Card>
    </div>
  );
}
