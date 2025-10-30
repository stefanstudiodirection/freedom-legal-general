import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AccountCardProps {
  type: 'current' | 'savings' | 'pension';
  title: string;
  subtitle: string;
  amount: React.ReactNode;
  primaryAction: string;
  primaryIcon: string;
  secondaryIcon: string;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  type,
  title,
  subtitle,
  amount,
  primaryAction,
  primaryIcon,
  secondaryIcon
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const getBackgroundColor = () => {
    switch (type) {
      case 'current':
        return 'bg-[#E4B33D]';
      case 'savings':
        return 'bg-[#A488F5]';
      case 'pension':
        return 'bg-[rgba(33,30,30,1)]';
      default:
        return 'bg-gray-500';
    }
  };

  const getTextColor = () => {
    return type === 'pension' ? 'text-white' : 'text-[#211E1E]';
  };

  const handlePrimaryAction = () => {
    if (type === 'pension') {
      navigate('/pension-warning');
    } else if (type === 'savings') {
      navigate('/move-funds', { 
        state: { 
          sourceAccount: 'savings', 
          destinationAccount: 'currentAccount' 
        } 
      });
    } else if (type === 'current') {
      // Current account cannot transfer out - do nothing or show message
      return;
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const handleSecondaryAction = () => {
    console.log(`Secondary action for ${type} account`);
  };

  return (
    <article className={`w-full ${getBackgroundColor()} p-4 rounded-[9.142px] ${type === 'pension' ? 'rounded-[9px]' : ''}`}>
      <div className={`flex w-full items-stretch gap-${type === 'pension' ? '5' : '1'} ${getTextColor()} font-normal justify-between`}>
        <div className={type === 'current' ? 'w-[188px]' : ''}>
          <h2 className={`${getTextColor()} text-[28px] leading-none`}>
            {title}
          </h2>
          <p className={`${getTextColor()} text-base leading-none mt-3`}>
            {subtitle}
          </p>
        </div>
        <div className="flex flex-col text-[27px] tracking-[0.55px] leading-none">
          <div className={getTextColor()}>
            {amount}
          </div>
        </div>
      </div>
      <div className="flex w-full gap-[40px_100px] justify-between mt-3">
        <button 
          className="items-center flex gap-1.5 text-sm text-white font-normal leading-none bg-black pl-2.5 pr-3 py-2 rounded-[30.472px] hover:bg-gray-800 transition-colors"
          onClick={handlePrimaryAction}
          aria-expanded={isExpanded}
        >
          <img
            src={primaryIcon}
            className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
            alt=""
          />
          <span className="text-white self-stretch my-auto">
            {primaryAction}
          </span>
        </button>
        <button 
          className="justify-center items-center flex min-h-8 gap-2 w-8 h-8 bg-black px-2 rounded-[400px] hover:bg-gray-800 transition-colors"
          onClick={handleSecondaryAction}
          aria-label="More options"
        >
          <img
            src={secondaryIcon}
            className="aspect-[1] object-contain w-4 self-stretch my-auto"
            alt=""
          />
        </button>
      </div>
    </article>
  );
};
