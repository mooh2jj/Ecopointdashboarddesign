import { useState } from 'react';
import { Header } from './Header';
import { NavigationBar } from './NavigationBar';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { Coffee, Zap, Gift, Leaf, ShoppingBag, Ticket } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ExchangeScreenProps {
  ecoPoints: number;
  onExchange: (pointsChange: number) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface ExchangeItem {
  id: string;
  service: string;
  pointsRequired: number;
  icon: any;
  description: string;
}

export function ExchangeScreen({ ecoPoints, onExchange, activeTab, onTabChange }: ExchangeScreenProps) {
  const [selectedItem, setSelectedItem] = useState<ExchangeItem | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const exchangeItems: ExchangeItem[] = [
    {
      id: '1',
      service: 'Coffee Coupon',
      pointsRequired: 300,
      icon: Coffee,
      description: 'Enjoy a free coffee at partner cafes'
    },
    {
      id: '2',
      service: 'EV Charging Credit',
      pointsRequired: 800,
      icon: Zap,
      description: '10,000 KRW charging credit'
    },
    {
      id: '3',
      service: 'Gift Card',
      pointsRequired: 1000,
      icon: Gift,
      description: '15,000 KRW gift card'
    },
    {
      id: '4',
      service: 'Tree Planting',
      pointsRequired: 500,
      icon: Leaf,
      description: 'Plant a tree in your name'
    },
    {
      id: '5',
      service: 'Shopping Voucher',
      pointsRequired: 1200,
      icon: ShoppingBag,
      description: '20,000 KRW shopping voucher'
    },
    {
      id: '6',
      service: 'Movie Ticket',
      pointsRequired: 400,
      icon: Ticket,
      description: 'One movie ticket'
    }
  ];

  const handleExchangeClick = (item: ExchangeItem) => {
    if (ecoPoints >= item.pointsRequired) {
      setSelectedItem(item);
      setShowConfirm(true);
    } else {
      toast.error('Insufficient Points', {
        description: `You need ${item.pointsRequired - ecoPoints} more points`
      });
    }
  };

  const handleConfirmExchange = () => {
    if (selectedItem) {
      onExchange(-selectedItem.pointsRequired);
      toast.success('Exchange Successful!', {
        description: `You've redeemed ${selectedItem.service}`
      });
      setShowConfirm(false);
      setSelectedItem(null);
    }
  };

  return (
    <div className="w-full h-full relative">
      <Header />

      <div className="absolute top-20 bottom-[100px] left-0 right-0 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="text-[#212121] text-3xl mb-2">Eco Point Exchange</div>
            <div className="flex items-center gap-3">
              <span className="text-[#757575]">Available Points:</span>
              <span className="text-[#2196F3] text-2xl">{ecoPoints.toLocaleString()}</span>
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
                  className={`p-6 bg-white border-[#E0E0E0] transition-all ${
                    canAfford ? 'hover:border-[#4CAF50] cursor-pointer' : 'opacity-60'
                  }`}
                  style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      canAfford ? 'bg-gradient-to-br from-[#4CAF50] to-[#2196F3]' : 'bg-[#E0E0E0]'
                    }`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="text-[#212121] text-xl mb-2">{item.service}</div>
                    <div className="text-[#757575] text-sm mb-4 h-10">{item.description}</div>
                    
                    <div className="text-[#2196F3] text-2xl mb-4">
                      {item.pointsRequired.toLocaleString()} pts
                    </div>

                    <Button
                      onClick={() => handleExchangeClick(item)}
                      disabled={!canAfford}
                      className={`w-full ${
                        canAfford 
                          ? 'bg-[#4CAF50] hover:bg-[#388E3C] text-white' 
                          : 'bg-[#E0E0E0] text-[#9E9E9E] cursor-not-allowed'
                      }`}
                      style={canAfford ? { boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' } : {}}
                    >
                      {canAfford ? 'Exchange' : 'Not Enough Points'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <NavigationBar activeTab={activeTab} onTabChange={onTabChange} />

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="bg-white" style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#212121]">Confirm Exchange?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#757575]">
              {selectedItem && (
                <>
                  You are about to exchange <span className="text-[#2196F3]">{selectedItem.pointsRequired} points</span> for{' '}
                  <span className="text-[#212121]">{selectedItem.service}</span>.
                  <br />
                  <br />
                  Remaining points: <span className="text-[#2196F3]">{ecoPoints - selectedItem.pointsRequired}</span>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white border-[#E53935] text-[#E53935] hover:bg-[#E53935]/10">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmExchange}
              className="bg-[#4CAF50] hover:bg-[#388E3C] text-white"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
