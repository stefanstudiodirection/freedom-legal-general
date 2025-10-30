import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const MoveFunds: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('0.00');
  
  const pensionBalance = 48750.00;
  const savingsBalance = 16250.00;

  const handleBack = () => {
    navigate('/pension-warning');
  };

  const handleKeypadClick = (value: string) => {
    if (value === 'backspace') {
      if (amount.length > 1) {
        const newAmount = amount.slice(0, -1);
        setAmount(newAmount === '' ? '0.00' : newAmount);
      }
    } else {
      // Remove leading zeros and format
      let newAmount = amount.replace('.', '');
      if (newAmount === '000') {
        newAmount = value;
      } else {
        newAmount = newAmount + value;
      }
      // Insert decimal point
      if (newAmount.length === 1) {
        setAmount(`0.0${newAmount}`);
      } else if (newAmount.length === 2) {
        setAmount(`0.${newAmount}`);
      } else {
        setAmount(`${newAmount.slice(0, -2)}.${newAmount.slice(-2)}`);
      }
    }
  };

  const handleNext = () => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0 && numAmount <= pensionBalance) {
      navigate('/review-transfer', { 
        state: { 
          amount: numAmount,
          pensionBalance,
          savingsBalance
        } 
      });
    }
  };

  const isValidAmount = () => {
    const numAmount = parseFloat(amount);
    return numAmount > 0 && numAmount <= pensionBalance;
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
          <h1 className="flex-1 text-center text-lg font-medium pr-12">Move funds</h1>
        </header>

        {/* Amount Input Section */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-[#716860] text-base mb-4">Enter amount to move</p>
          <div className="text-6xl font-normal tracking-tight text-[#716860]">
            {amount}
            <span className="animate-pulse">|</span>
          </div>
          
          {/* Currency Selector */}
          <button className="mt-4 flex items-center gap-2 bg-[#211E1E] px-4 py-2 rounded-full">
            <span className="text-2xl">🇬🇧</span>
            <span className="text-white text-sm">GBP (£)</span>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Transfer Cards */}
        <div className="flex-1 space-y-4">
          {/* Move From Card */}
          <div className="bg-[#211E1E] rounded-lg p-4 flex items-center justify-between">
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
              <p className="text-[#716860] text-sm">Balance</p>
              <p className="text-white text-base font-medium">£{pensionBalance.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <button className="w-10 h-10 bg-[#211E1E] rounded-full flex items-center justify-center border-4 border-black">
              <ArrowDown className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Move To Card */}
          <div className="bg-[#211E1E] rounded-lg p-4 flex items-center justify-between">
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
              <p className="text-[#716860] text-sm">Balance</p>
              <p className="text-white text-base font-medium">£{savingsBalance.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-6">
          <Button 
            onClick={handleNext}
            disabled={!isValidAmount()}
            className={`w-full h-14 text-base rounded-xl font-medium ${
              isValidAmount() 
                ? 'bg-[#A488F5] hover:bg-[#9575e8] text-white' 
                : 'bg-[#2a2626] text-[#716860] cursor-not-allowed'
            }`}
          >
            Next
          </Button>
        </div>

        {/* Numeric Keypad */}
        <div className="mt-6 grid grid-cols-3 gap-2">
          {[
            { num: '1', letters: '' },
            { num: '2', letters: 'ABC' },
            { num: '3', letters: 'DEF' },
            { num: '4', letters: 'GHI' },
            { num: '5', letters: 'JKL' },
            { num: '6', letters: 'MNO' },
            { num: '7', letters: 'PQRS' },
            { num: '8', letters: 'TUV' },
            { num: '9', letters: 'WXYZ' }
          ].map((key) => (
            <button
              key={key.num}
              onClick={() => handleKeypadClick(key.num)}
              className="bg-[#211E1E] h-14 rounded-lg hover:bg-[#2a2626] transition-colors flex flex-col items-center justify-center"
            >
              <span className="text-white text-xl">{key.num}</span>
              {key.letters && <span className="text-[#716860] text-xs">{key.letters}</span>}
            </button>
          ))}
          <button
            onClick={() => handleKeypadClick('0')}
            className="bg-[#211E1E] h-14 rounded-lg hover:bg-[#2a2626] transition-colors col-start-2"
          >
            <span className="text-white text-xl">0</span>
          </button>
          <button
            onClick={() => handleKeypadClick('backspace')}
            className="bg-[#211E1E] h-14 rounded-lg hover:bg-[#2a2626] transition-colors flex items-center justify-center"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoveFunds;
