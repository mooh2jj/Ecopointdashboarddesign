import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { Coffee, Zap, Gift, Leaf, ShoppingBag, Ticket } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ExchangeScreenDarkProps {
  ecoPoints: number;
  onExchange: (pointsChange: number) => void;
}

interface ExchangeItem {
  id: string;
  service: string;
  pointsRequired: number;
  icon: any;
  description: string;
}

export function ExchangeScreenDark({ ecoPoints, onExchange }: ExchangeScreenDarkProps) {
  const [selectedItem, setSelectedItem] = useState<ExchangeItem | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const exchangeItems: ExchangeItem[] = [
    { id: '1', service: '커피 쿠폰', pointsRequired: 300, icon: Coffee, description: '파트너 카페 무료 커피' },
    { id: '2', service: 'EV 충전 크레딧', pointsRequired: 800, icon: Zap, description: '10,000원 충전 크레딧' },
    { id: '3', service: '기프트 카드', pointsRequired: 1000, icon: Gift, description: '15,000원 상품권' },
    { id: '4', service: '나무 심기', pointsRequired: 500, icon: Leaf, description: '당신의 이름으로 나무 한 그루' },
    { id: '5', service: '쇼핑 바우처', pointsRequired: 1200, icon: ShoppingBag, description: '20,000원 쇼핑 바우처' },
    { id: '6', service: '영화 티켓', pointsRequired: 400, icon: Ticket, description: '영화 관람권 1매' },
  ];

  const handleExchangeClick = (item: ExchangeItem) => {
    if (ecoPoints >= item.pointsRequired) {
      setSelectedItem(item);
      setShowConfirm(true);
    } else {
      toast.error('포인트 부족', {
        description: `${item.pointsRequired - ecoPoints} 포인트가 더 필요합니다`
      });
    }
  };

  const handleConfirmExchange = () => {
    if (selectedItem) {
      onExchange(-selectedItem.pointsRequired);
      toast.success('교환 완료!', {
        description: `${selectedItem.service}를 성공적으로 교환했습니다`
      });
      setShowConfirm(false);
      setSelectedItem(null);
    }
  };

  return (
    <div className="w-full h-full bg-[#121212] overflow-y-auto p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="text-[#FFFFFF] text-4xl mb-3">포인트 교환</div>
          <div className="flex items-center gap-4">
            <span className="text-[#B0BEC5] text-lg">사용 가능 포인트:</span>
            <span className="text-[#64B5F6] text-3xl">{ecoPoints.toLocaleString()}</span>
          </div>
        </div>

        {/* Exchange Items Grid */}
        <div className="grid grid-cols-3 gap-6">
          {exchangeItems.map((item) => {
            const Icon = item.icon;
            const canAfford = ecoPoints >= item.pointsRequired;

            return (
              <Card 
                key={item.id}
                className={`bg-[#1E1E1E] border-[#2E2E2E] p-6 transition-all ${
                  canAfford ? 'hover:border-[#81C784] cursor-pointer' : 'opacity-50'
                }`}
                style={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.4)' }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-5 ${
                    canAfford ? 'bg-gradient-to-br from-[#81C784] to-[#64B5F6]' : 'bg-[#2E2E2E]'
                  }`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <div className="text-[#FFFFFF] text-xl mb-2">{item.service}</div>
                  <div className="text-[#B0BEC5] text-sm mb-5 h-10">{item.description}</div>
                  
                  <div className="text-[#64B5F6] text-3xl mb-5">
                    {item.pointsRequired.toLocaleString()}
                  </div>

                  <Button
                    onClick={() => handleExchangeClick(item)}
                    disabled={!canAfford}
                    className={`w-full ${
                      canAfford 
                        ? 'bg-[#81C784] hover:bg-[#66BB6A] text-white' 
                        : 'bg-[#2E2E2E] text-[#757575] cursor-not-allowed'
                    }`}
                    style={canAfford ? { boxShadow: '0px 4px 12px rgba(0,0,0,0.4)' } : {}}
                  >
                    {canAfford ? '교환하기' : '포인트 부족'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="bg-[#1E1E1E] border-[#2E2E2E]" style={{ boxShadow: '0px 4px 12px rgba(0,0,0,0.6)' }}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#FFFFFF]">교환 확인</AlertDialogTitle>
            <AlertDialogDescription className="text-[#B0BEC5]">
              {selectedItem && (
                <>
                  <span className="text-[#64B5F6]">{selectedItem.pointsRequired} 포인트</span>를 사용하여{' '}
                  <span className="text-[#FFFFFF]">{selectedItem.service}</span>로 교환하시겠습니까?
                  <br />
                  <br />
                  교환 후 포인트: <span className="text-[#64B5F6]">{ecoPoints - selectedItem.pointsRequired}</span>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#121212] border-[#2E2E2E] text-[#B0BEC5] hover:bg-[#2E2E2E]">
              취소
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmExchange}
              className="bg-[#81C784] hover:bg-[#66BB6A] text-white"
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
