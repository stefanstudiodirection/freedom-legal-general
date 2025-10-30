import React, { useState } from "react";
import { StatusBar } from "./StatusBar";
import { Header } from "./Header";
import { AccountCard } from "./AccountCard";
import { PromotionCard } from "./PromotionCard";
import { BottomNavigation } from "./BottomNavigation";
import { useAccounts } from "@/contexts/AccountContext";
import { useNavigate } from 'react-router-dom';

export const HomeDark: React.FC = () => {
  const [showAllPromotions, setShowAllPromotions] = useState(false);
  const { accounts } = useAccounts();
  const navigate = useNavigate();

  const formatBalance = (balance: number) => {
    const parts = balance.toLocaleString('en-GB', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    }).split('.');
    
    const wholePart = parts[0].replace('£', '');
    const decimalPart = parts[1];
    
    return (
      <span>
        <span
          style={{
            fontFamily: "Arial, -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "25px",
            letterSpacing: "0.5px",
          }}
        >
          £{wholePart}
        </span>
        .
        <span style={{ fontSize: "17px", letterSpacing: "0.34px" }}>{decimalPart}</span>
      </span>
    );
  };

  const handleSeeAllPromotions = () => {
    setShowAllPromotions(!showAllPromotions);
  };

  return (
    <div className="justify-center items-stretch flex max-w-[480px] w-full flex-col overflow-hidden bg-black mx-auto min-h-screen pb-20">
      <div className="w-full">
        {/* <StatusBar /> */}

        <Header />

        <main className="w-full mt-6 px-4">
          <section aria-label="Account overview" className="w-full">
            <div onClick={() => navigate('/account/currentAccount')} style={{ cursor: 'pointer' }}>
              <AccountCard
                type="current"
                title="Current Account"
                subtitle="Funds available to spend"
                amount={formatBalance(accounts.currentAccount.balance)}
                primaryAction="Card details"
                primaryIcon="https://api.builder.io/api/v1/image/assets/TEMP/0d7398014e84f6d0301446900b81b658bf87b703?placeholderIfAbsent=true"
                secondaryIcon="https://api.builder.io/api/v1/image/assets/TEMP/1a679bd7b3be1f0055ae6f39f41097bff967e2f1?placeholderIfAbsent=true"
              />
            </div>

            <div className="mt-[9px]" onClick={() => navigate('/account/savings')} style={{ cursor: 'pointer' }}>
              <AccountCard
                type="savings"
                title="Savings"
                subtitle="High Interest Savings (Tax Free)"
                amount={formatBalance(accounts.savings.balance)}
                primaryAction="Move to Current Account"
                primaryIcon="https://api.builder.io/api/v1/image/assets/TEMP/8a14c4e95d0138ec00a7f594bbab4d3e9eefbd12?placeholderIfAbsent=true"
                secondaryIcon="https://api.builder.io/api/v1/image/assets/TEMP/dcd35badeac16ef7484b4ba3d04032841bc1108b?placeholderIfAbsent=true"
              />
            </div>

            <div className="mt-[9px]" onClick={() => navigate('/account/pension')} style={{ cursor: 'pointer' }}>
              <AccountCard
                type="pension"
                title="Pension"
                subtitle="Your Pension and Investments"
                amount={formatBalance(accounts.pension.balance)}
                primaryAction="Move to Savings"
                primaryIcon="https://api.builder.io/api/v1/image/assets/TEMP/51d83237c5d984d5c39a547fc4159fd1864483a6?placeholderIfAbsent=true"
                secondaryIcon="https://api.builder.io/api/v1/image/assets/TEMP/d1845d5ef8b1c1c6c38882a9950c20690465b2da?placeholderIfAbsent=true"
              />
            </div>
          </section>
        </main>

        <section className="w-full pb-6 px-4 mt-6" aria-label="Promotions">
          <div className="flex w-full items-center gap-[40px_100px] leading-none justify-between">
            <h2 className="text-white text-[19px] font-normal self-stretch my-auto">Promotions</h2>
            <button
              className="self-stretch flex items-center gap-1 text-lg text-[#A488F5] font-medium my-auto hover:text-[#9575e8] transition-colors"
              onClick={handleSeeAllPromotions}
              aria-expanded={showAllPromotions}
            >
              <span className="text-[#A488F5] self-stretch my-auto">{showAllPromotions ? "Show less" : "See all"}</span>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/c7bef006abc66b8f7fa6574d6a4853ed2994e5d2?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
                alt=""
              />
            </button>
          </div>

          <div className="flex w-full items-center gap-4 font-normal mt-4 overflow-x-auto">
            <PromotionCard
              title="Boost Your Retirement Savings by 15%"
              backgroundImage="https://api.builder.io/api/v1/image/assets/TEMP/77d83e8891b893820180d5c1091f1c417adaa71d?placeholderIfAbsent=true"
              isWide={true}
            />
            <PromotionCard
              title="Limited Time: Zero Fees on Contributions"
              backgroundImage="https://api.builder.io/api/v1/image/assets/TEMP/ca2cd3deda67d27f0470bffdcaa474fd18a319eb?placeholderIfAbsent=true"
              isWide={true}
            />
            {showAllPromotions && (
              <>
                <PromotionCard
                  title="Exclusive Investment Opportunities"
                  backgroundImage="https://api.builder.io/api/v1/image/assets/TEMP/77d83e8891b893820180d5c1091f1c417adaa71d?placeholderIfAbsent=true"
                  isWide={true}
                />
                <PromotionCard
                  title="Premium Account Benefits"
                  backgroundImage="https://api.builder.io/api/v1/image/assets/TEMP/ca2cd3deda67d27f0470bffdcaa474fd18a319eb?placeholderIfAbsent=true"
                  isWide={true}
                />
              </>
            )}
          </div>
        </section>
        <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto">
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
};

export default HomeDark;
