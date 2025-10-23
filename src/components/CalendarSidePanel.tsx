import { Calendar } from './ui/calendar';
import { Card } from './ui/card';
import { useState } from 'react';

interface CalendarSidePanelProps {
  ecoPoints: number;
}

export function CalendarSidePanel({ ecoPoints }: CalendarSidePanelProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div 
      className="absolute top-[80px] right-[40px] bottom-[40px] w-[340px] bg-[#1E1E1E] rounded-2xl p-5 flex flex-col"
      style={{ boxShadow: '0px 3px 10px rgba(0,0,0,0.3)' }}
    >
      {/* Calendar */}
      <div className="mb-4">
        <div className="text-[#FFFFFF] mb-3" style={{ fontSize: '20px' }}>2025년 8월</div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-xl border-none"
          classNames={{
            months: "flex flex-col",
            month: "space-y-3",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-[#FFFFFF]",
            nav: "space-x-1 flex items-center",
            nav_button: "h-8 w-8 bg-transparent p-0 text-[#B0BEC5] hover:text-[#FFFFFF]",
            table: "w-full border-collapse",
            head_row: "flex",
            head_cell: "text-[#B0BEC5] rounded-md w-9 text-sm",
            row: "flex w-full mt-1",
            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-[#64B5F6]/20",
            day: "h-9 w-9 p-0 text-[#FFFFFF] hover:bg-[#64B5F6]/30 rounded-md transition-colors",
            day_selected: "bg-[#64B5F6] text-white hover:bg-[#64B5F6]",
            day_today: "bg-[#81C784]/20 text-[#81C784]",
            day_outside: "text-[#B0BEC5]/30",
            day_disabled: "text-[#B0BEC5]/30",
            day_hidden: "invisible",
          }}
        />
      </div>

      {/* Summary Card */}
      <Card className="bg-[#121212] border-[#2E2E2E] p-4 flex-1">
        <div className="text-[#FFFFFF] mb-3" style={{ fontSize: '18px' }}>일별 에코포인트 요약</div>
        <div className="space-y-2">
          <div className="flex items-center justify-between" style={{ fontSize: '16px' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#81C784]" />
              <span className="text-[#B0BEC5]">정속주행: 20분</span>
            </div>
            <span className="text-[#81C784]">+20</span>
          </div>
          <div className="flex items-center justify-between" style={{ fontSize: '16px' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#64B5F6]" />
              <span className="text-[#B0BEC5]">경제주행: 50분</span>
            </div>
            <span className="text-[#64B5F6]">+50</span>
          </div>
          <div className="flex items-center justify-between" style={{ fontSize: '16px' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FFD54F]" />
              <span className="text-[#B0BEC5]">친환경 공조: 40분</span>
            </div>
            <span className="text-[#FFD54F]">+20</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#2E2E2E] flex items-center justify-between">
          <span className="text-[#FFFFFF]" style={{ fontSize: '16px' }}>오늘 총 포인트</span>
          <span className="text-[#81C784]" style={{ fontSize: '22px', fontWeight: 500 }}>+90</span>
        </div>
      </Card>
    </div>
  );
}