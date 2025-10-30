import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ReviewTransfer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, pensionBalance, savingsBalance } = location.state || { 
    amount: 0, 
    pensionBalance: 48750.00, 
    savingsBalance: 16250.00 
  };

  const newPensionBalance = pensionBalance - amount;
  const newSavingsBalance = savingsBalance + amount;
  const retirementImpact = amount * 1.64; // Approximate lost growth multiplier

  const handleBack = () => {
    navigate('/move-funds');
  };

  const handleMoveFunds = () => {
    navigate('/transfer-confirmed', { 
      state: { 
        amount,
        destination: 'Savings'
      } 
    });
  };

  return (
    <div className="min-h-screen bg-black text-white max-w-[480px] mx-auto flex flex-col">
      <div className="px-4 py-6 flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center mb-8">
          <button 
            onClick={handleBack}
            className="w-12 h-12 rounded-full bg-[#211E1E] flex items-center justify-center hover:bg-[#2a2626] transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="flex-1 text-center text-lg font-medium pr-12">Review transfer</h1>
        </header>

        {/* Amount Display */}
        <div className="mb-6">
          <p className="text-white text-sm mb-2">Amount to move</p>
          <div className="flex items-center justify-between">
            <p className="text-white text-4xl font-normal">
              £{amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇬🇧</span>
              <span className="text-white text-sm">GBP (£)</span>
            </div>
          </div>
        </div>

        {/* Transfer Summary Cards */}
        <div className="space-y-4 mb-6">
          {/* Move From Card */}
          <div className="bg-[#211E1E] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <p className="text-[#716860] text-sm">Move from</p>
                  <p className="text-white text-base font-medium">Pension</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#716860] text-sm">Balance after transfer</p>
                <p className="text-white text-base font-medium">
                  £{newPensionBalance.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          {/* Move To Card */}
          <div className="bg-[#211E1E] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#A488F5] rounded-full flex items-center justify-center">
                  <span className="text-2xl">🐷</span>
                </div>
                <div>
                  <p className="text-[#716860] text-sm">Move to</p>
                  <p className="text-white text-base font-medium">Savings</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#716860] text-sm">Balance after transfer</p>
                <p className="text-white text-base font-medium">
                  £{newSavingsBalance.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Retirement Impact Warning */}
        <div className="bg-[#211E1E] rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-[#E4B33D]" />
            </div>
            <div>
              <h3 className="text-white text-base font-medium mb-2">Retirement impact</h3>
              <p className="text-[#716860] text-sm leading-relaxed">
                Taking £{amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} now equals £{retirementImpact.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} less at retirement due to lost growth
              </p>
            </div>
          </div>
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-1"></div>

        {/* Move Funds Button */}
        <div className="mt-6">
          <Button 
            onClick={handleMoveFunds}
            className="w-full h-14 bg-[#A488F5] hover:bg-[#9575e8] text-white font-medium text-base rounded-xl"
          >
            Move funds
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewTransfer;
