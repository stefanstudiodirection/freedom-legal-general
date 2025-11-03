import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Delete } from 'lucide-react';
import { useAccounts, AccountType } from '@/contexts/AccountContext';
import { useToast } from '@/hooks/use-toast';

const CORRECT_PIN = '0000';

export const PinConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { transferFunds } = useAccounts();
  const { toast } = useToast();
  
  const { amount, sourceAccount, destinationAccount, currency = 'GBP' } = location.state as { 
    amount: number;
    sourceAccount: AccountType;
    destinationAccount: AccountType;
    currency?: string;
  };

  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Auto-focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    // Check PIN when all 4 digits are entered
    if (pin.every(digit => digit !== '')) {
      const enteredPin = pin.join('');
      
      if (enteredPin === CORRECT_PIN) {
        // Execute the transfer
        transferFunds(sourceAccount, destinationAccount, amount);
        
        // Navigate to confirmation page
        setTimeout(() => {
          navigate('/transfer-confirmed', { 
            state: { 
              amount,
              sourceAccount,
              destinationAccount,
              currency
            } 
          });
        }, 300);
      } else {
        // Show error and reset
        setIsError(true);
        toast({
          title: "Incorrect PIN",
          description: "Please try again",
          variant: "destructive",
        });
        
        setTimeout(() => {
          setPin(['', '', '', '']);
          setFocusedIndex(0);
          setIsError(false);
          inputRefs.current[0]?.focus();
        }, 1000);
      }
    }
  }, [pin, amount, sourceAccount, destinationAccount, currency, transferFunds, navigate, toast]);

  const handleNumberClick = (num: string) => {
    const currentIndex = pin.findIndex(digit => digit === '');
    if (currentIndex !== -1) {
      const newPin = [...pin];
      newPin[currentIndex] = num;
      setPin(newPin);
      setFocusedIndex(Math.min(currentIndex + 1, 3));
      
      // Focus next input
      if (currentIndex < 3) {
        inputRefs.current[currentIndex + 1]?.focus();
      }
    }
  };

  const handleBackspace = () => {
    const lastFilledIndex = pin.reduce((lastIndex, digit, index) => 
      digit !== '' ? index : lastIndex
    , -1);

    if (lastFilledIndex !== -1) {
      const newPin = [...pin];
      newPin[lastFilledIndex] = '';
      setPin(newPin);
      setFocusedIndex(lastFilledIndex);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  const handleBack = () => {
    navigate('/review-transfer', { 
      state: { amount, sourceAccount, destinationAccount, currency } 
    });
  };

  const numberButtons = [
    { num: '1', letters: '' },
    { num: '2', letters: 'ABC' },
    { num: '3', letters: 'DEF' },
    { num: '4', letters: 'GHI' },
    { num: '5', letters: 'JKL' },
    { num: '6', letters: 'MNO' },
    { num: '7', letters: 'PQRS' },
    { num: '8', letters: 'TUV' },
    { num: '9', letters: 'WXYZ' },
  ];

  return (
    <div className="min-h-screen bg-[#F3F3F3] dark:bg-black text-foreground max-w-[480px] mx-auto flex flex-col">
      <div className="px-4 py-6 flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center mb-8">
          <button 
            onClick={handleBack}
            className="w-12 h-12 rounded-full bg-white dark:bg-[#211E1E] border border-border flex items-center justify-center hover:bg-gray-50 dark:hover:bg-[#2a2626] transition-colors text-foreground"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="flex-1 text-center text-lg font-medium pr-12 text-foreground">Confirm transfer</h1>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-start pt-12">
          <h2 className="text-2xl font-bold text-foreground mb-3">Enter your PIN</h2>
          <p className="text-muted-foreground text-sm mb-8">Please enter your PIN to confirm this transfer</p>

          {/* PIN Input Fields */}
          <div className="flex gap-4 mb-12">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="none"
                value={digit}
                readOnly
                className={`w-16 h-16 text-center text-2xl font-medium bg-white dark:bg-[#211E1E] rounded-lg border-2 transition-all duration-200 ${
                  isError 
                    ? 'border-destructive' 
                    : focusedIndex === index 
                      ? 'border-[#A488F5]' 
                      : 'border-border'
                } ${digit ? 'text-foreground' : 'text-transparent'}`}
                onFocus={() => setFocusedIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Numeric Keypad */}
        <div className="bg-white dark:bg-[#1a1818] rounded-3xl p-4 shadow-lg">
          <div className="grid grid-cols-3 gap-3 mb-3">
            {numberButtons.map(({ num, letters }) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num)}
                className="h-16 bg-white dark:bg-[#211E1E] hover:bg-gray-50 dark:hover:bg-[#2a2626] rounded-xl flex flex-col items-center justify-center transition-colors border border-border"
              >
                <span className="text-2xl font-medium text-foreground">{num}</span>
                {letters && <span className="text-xs text-muted-foreground">{letters}</span>}
              </button>
            ))}
          </div>
          
          {/* Bottom row with 0 and backspace */}
          <div className="grid grid-cols-3 gap-3">
            <div></div>
            <button
              onClick={() => handleNumberClick('0')}
              className="h-16 bg-white dark:bg-[#211E1E] hover:bg-gray-50 dark:hover:bg-[#2a2626] rounded-xl flex items-center justify-center transition-colors border border-border"
            >
              <span className="text-2xl font-medium text-foreground">0</span>
            </button>
            <button
              onClick={handleBackspace}
              className="h-16 bg-white dark:bg-[#211E1E] hover:bg-gray-50 dark:hover:bg-[#2a2626] rounded-xl flex items-center justify-center transition-colors border border-border"
              aria-label="Backspace"
            >
              <Delete className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinConfirmation;
