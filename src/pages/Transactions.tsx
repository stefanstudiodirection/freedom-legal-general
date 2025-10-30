import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, ArrowDown, ArrowUp, ArrowRightLeft } from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { AccountType } from "@/contexts/AccountContext";

interface Transaction {
  id: string;
  type: "withdrawal" | "topup" | "transfer";
  account: AccountType;
  amount: number;
  date: Date;
}

// Sample transaction data
const sampleTransactions: Transaction[] = [
  { id: "1", type: "withdrawal", account: "currentAccount", amount: -250.00, date: new Date("2025-10-29T09:25:00") },
  { id: "2", type: "topup", account: "currentAccount", amount: 300.00, date: new Date("2025-10-16T13:15:00") },
  { id: "3", type: "withdrawal", account: "currentAccount", amount: -80.00, date: new Date("2025-10-12T11:25:00") },
  { id: "4", type: "transfer", account: "currentAccount", amount: -90.00, date: new Date("2025-10-06T20:50:00") },
  { id: "5", type: "withdrawal", account: "currentAccount", amount: -80.00, date: new Date("2025-10-01T15:25:00") },
  { id: "6", type: "topup", account: "currentAccount", amount: 300.00, date: new Date("2025-09-25T13:15:00") },
  { id: "7", type: "transfer", account: "currentAccount", amount: -90.00, date: new Date("2025-09-12T11:25:00") },
  { id: "8", type: "withdrawal", account: "savings", amount: -150.00, date: new Date("2025-10-20T14:30:00") },
  { id: "9", type: "topup", account: "savings", amount: 500.00, date: new Date("2025-10-10T10:20:00") },
  { id: "10", type: "withdrawal", account: "pension", amount: -1000.00, date: new Date("2025-10-15T16:45:00") },
];

const Transactions: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState<AccountType>("currentAccount");
  const navigate = useNavigate();

  const accountLabels: Record<AccountType, string> = {
    currentAccount: "Current account",
    savings: "Savings",
    pension: "Pension"
  };

  const filteredTransactions = sampleTransactions
    .filter(t => t.account === selectedAccount)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-GB', { month: 'short' });
    const year = date.getFullYear();
    const time = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
    return `${day} ${month} ${year}, ${time}`;
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "withdrawal":
        return <ArrowDown className="w-5 h-5 text-white" />;
      case "topup":
        return <ArrowUp className="w-5 h-5 text-white" />;
      case "transfer":
        return <ArrowRightLeft className="w-5 h-5 text-white" />;
      default:
        return null;
    }
  };

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case "withdrawal":
        return "Withdrawal";
      case "topup":
        return "Top up";
      case "transfer":
        return "Transfer";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-2">
        <span className="text-white text-[15px]">9:41</span>
        <div className="flex gap-1 items-center">
          <div className="flex flex-col gap-[2px]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-[3px] h-[3px] bg-white rounded-full" />
            ))}
          </div>
          <div className="w-4 h-3 border border-white rounded-sm relative">
            <div className="absolute inset-[1px] bg-white" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 pt-4 pb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[28px] font-semibold">Transactions</h1>
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-[#1C1C1E] flex items-center justify-center">
              <Search className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#1C1C1E] flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Account Filter Tabs */}
      <div className="px-6 pb-6 flex gap-2">
        {(Object.keys(accountLabels) as AccountType[]).map((account) => (
          <button
            key={account}
            onClick={() => setSelectedAccount(account)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedAccount === account
                ? "bg-[#A488F5] text-white"
                : "bg-[#1C1C1E] text-white"
            }`}
          >
            {accountLabels[account]}
          </button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="px-6">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center gap-4 py-4 border-b border-[#2C2C2E] cursor-pointer hover:bg-[#1C1C1E]/30 transition-colors"
            onClick={() => {/* Could navigate to transaction detail */}}
          >
            <div className="w-12 h-12 rounded-lg bg-[#2C2C2E] flex items-center justify-center flex-shrink-0">
              {getTransactionIcon(transaction.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-base font-medium">
                {getTransactionLabel(transaction.type)}
              </div>
              <div className="text-[#8E8E93] text-sm">
                {formatDate(transaction.date)}
              </div>
            </div>
            <div
              className={`text-lg font-semibold ${
                transaction.amount >= 0 ? "text-[#34C759]" : "text-white"
              }`}
            >
              {transaction.amount >= 0 ? "+ " : "- "}£{" "}
              {Math.abs(transaction.amount).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Transactions;
