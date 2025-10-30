import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, TrendingDown, CreditCard, PieChart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { StatusBar } from '@/components/StatusBar';

export const PensionWarning: React.FC = () => {
  const navigate = useNavigate();
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleBack = () => {
    navigate('/');
  };

  const handleContinue = () => {
    if (dontShowAgain) {
      localStorage.setItem('hidePensionWarning', 'true');
    }
    navigate('/move-funds');
  };

  const handleLearnMore = () => {
    // Open educational content
    console.log('Opening educational content');
  };

  return (
    <div className="min-h-screen bg-black text-white max-w-[480px] mx-auto flex flex-col">
      {/* <StatusBar /> */}
      
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

      {/* Warning Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-[#211E1E] rounded-2xl flex items-center justify-center">
          <div className="w-12 h-12 bg-[#E4B33D] rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-black" fill="black" />
          </div>
        </div>
      </div>

      {/* Main Heading */}
      <h2 className="text-2xl font-normal text-center mb-8 leading-tight">
        You're about to access your<br />pension early
      </h2>

      {/* Important Information Section */}
      <div className="flex-1">
        <h3 className="text-base font-normal mb-4">Important things to know:</h3>
        
        <div className="space-y-4 mb-6">
          {/* Item 1 */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 flex-shrink-0">
              <TrendingDown className="w-8 h-8 text-[#A488F5]" />
            </div>
            <p className="text-base pt-1">This will reduce your retirement savings</p>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 flex-shrink-0">
              <CreditCard className="w-8 h-8 text-[#A488F5]" />
            </div>
            <p className="text-base pt-1">Interest charges apply (3.9 APR)</p>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 flex-shrink-0">
              <PieChart className="w-8 h-8 text-[#A488F5]" />
            </div>
            <p className="text-base pt-1">You can access up to 25% of pension</p>
          </div>
        </div>

        <p className="text-sm text-[#716860] mb-6">
          We'll show you the exact impact after you enter the amount on the review screen
        </p>

        {/* Learn More Link */}
        <button 
          onClick={handleLearnMore}
          className="w-auto inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-md hover:bg-white/5 transition-colors mb-6"
        >
          <span className="text-sm">Learn more about this topic</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-4 pt-4">
        {/* Checkbox */}
        <div className="flex items-center gap-3">
          <Checkbox 
            id="dontShow" 
            checked={dontShowAgain}
            onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
            className="border-white/40 data-[state=checked]:bg-[#A488F5] data-[state=checked]:border-[#A488F5]"
          />
          <label 
            htmlFor="dontShow" 
            className="text-base cursor-pointer select-none"
          >
            Don't show this message again
          </label>
        </div>

        {/* Continue Button */}
        <Button 
          onClick={handleContinue}
          className="w-full h-14 bg-[#A488F5] hover:bg-[#9575e8] text-black font-medium text-base rounded-xl"
        >
          I understand, continue
        </Button>
      </div>
      </div>
    </div>
  );
};

export default PensionWarning;
