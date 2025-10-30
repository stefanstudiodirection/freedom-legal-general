import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AccountType = 'pension' | 'savings' | 'currentAccount';

export interface Account {
  id: AccountType;
  name: string;
  icon: string;
  balance: number;
  color: string;
}

interface AccountContextType {
  accounts: Record<AccountType, Account>;
  updateBalance: (accountId: AccountType, newBalance: number) => void;
  transferFunds: (from: AccountType, to: AccountType, amount: number) => void;
  getAccount: (accountId: AccountType) => Account;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

const INITIAL_ACCOUNTS: Record<AccountType, Account> = {
  pension: {
    id: 'pension',
    name: 'Pension',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M17.25 8.39719V7.875C17.25 5.52375 13.7034 3.75 9 3.75C4.29656 3.75 0.75 5.52375 0.75 7.875V11.625C0.75 13.5834 3.21094 15.1397 6.75 15.6056V16.125C6.75 18.4762 10.2966 20.25 15 20.25C19.7034 20.25 23.25 18.4762 23.25 16.125V12.375C23.25 10.4344 20.8669 8.87625 17.25 8.39719Z"
          fill="white"
        />
      </svg>
    ),
    balance: 48750.0,
    color: '#FFFFFF',
  },

  savings: {
    id: 'savings',
    name: 'Savings',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M21.1875 8.25781C21.15 8.16406 21.1106 8.07031 21.0703 7.97656C20.4654 6.58159 19.4865 5.38109 18.2419 4.50781H20.25C20.4489 4.50781 20.6397 4.42879 20.7803 4.28814C20.921 4.14749 21 3.95672 21 3.75781C21 3.5589 20.921 3.36813 20.7803 3.22748C20.6397 3.08683 20.4489 3.00781 20.25 3.00781H10.5C8.42634 3.01045 6.42951 3.79283 4.90601 5.19962C3.38252 6.6064 2.4438 8.53468 2.27625 10.6016C1.6284 10.7626 1.05277 11.1351 0.640489 11.6602C0.228203 12.1852 0.00281392 12.8328 0 13.5003C0 13.6992 0.0790176 13.89 0.21967 14.0306C0.360322 14.1713 0.551088 14.2503 0.75 14.2503C0.948912 14.2503 1.13968 14.1713 1.28033 14.0306C1.42098 13.89 1.5 13.6992 1.5 13.5003C1.50017 13.2268 1.57512 12.9586 1.71673 12.7246C1.85834 12.4906 2.06122 12.2998 2.30344 12.1728C2.49012 13.8555 3.19176 15.4395 4.3125 16.7084L5.49 20.0047C5.5941 20.2962 5.78586 20.5485 6.03898 20.7267C6.29209 20.905 6.59416 21.0005 6.90375 21.0003H8.09625C8.40567 21.0003 8.70754 20.9047 8.96047 20.7264C9.2134 20.5482 9.40502 20.2961 9.50906 20.0047L9.68906 19.5003H15.0609L15.2409 20.0047C15.345 20.2961 15.5366 20.5482 15.7895 20.7264C16.0425 20.9047 16.3443 21.0003 16.6537 21.0003H17.8462C18.1557 21.0003 18.4575 20.9047 18.7105 20.7264C18.9634 20.5482 19.155 20.2961 19.2591 20.0047L20.7787 15.7503H21C21.5967 15.7503 22.169 15.5133 22.591 15.0913C23.0129 14.6693 23.25 14.097 23.25 13.5003V10.5003C23.2501 9.93598 23.0381 9.39222 22.6561 8.97685C22.274 8.56148 21.7499 8.30484 21.1875 8.25781Z"
          fill="#A488F5"
        />
      </svg>
    ),
    balance: 16250.0,
    color: '#A488F5',
  },

  currentAccount: {
    id: 'currentAccount',
    name: 'Current Account',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="15"
        viewBox="0 0 20 15"
        fill="none"
      >
        <path
          d="M17.25 0H2.25C1.65326 0 1.08097 0.237053 0.65901 0.65901C0.237053 1.08097 0 1.65326 0 2.25V12.75C0 13.3467 0.237053 13.919 0.65901 14.341C1.08097 14.7629 1.65326 15 2.25 15H17.25C17.8467 15 18.419 14.7629 18.841 14.341C19.2629 13.919 19.5 13.3467 19.5 12.75V2.25C19.5 1.65326 19.2629 1.08097 18.841 0.65901C18.419 0.237053 17.8467 0 17.25 0Z"
          fill="#E4B33D"
        />
      </svg>
    ),
    balance: 74500.0,
    color: '#60A5FA',
  },
};

const STORAGE_KEY = 'account_balances';

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Record<AccountType, Account>>(() => {
    // Load from localStorage on initialization
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return {
          ...INITIAL_ACCOUNTS,
          pension: { ...INITIAL_ACCOUNTS.pension, balance: parsed.pension || INITIAL_ACCOUNTS.pension.balance },
          savings: { ...INITIAL_ACCOUNTS.savings, balance: parsed.savings || INITIAL_ACCOUNTS.savings.balance },
          currentAccount: { ...INITIAL_ACCOUNTS.currentAccount, balance: parsed.currentAccount || INITIAL_ACCOUNTS.currentAccount.balance }
        };
      } catch (e) {
        return INITIAL_ACCOUNTS;
      }
    }
    return INITIAL_ACCOUNTS;
  });

  // Persist to localStorage whenever accounts change
  useEffect(() => {
    const balances = {
      pension: accounts.pension.balance,
      savings: accounts.savings.balance,
      currentAccount: accounts.currentAccount.balance
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(balances));
  }, [accounts]);

  const updateBalance = (accountId: AccountType, newBalance: number) => {
    setAccounts(prev => ({
      ...prev,
      [accountId]: {
        ...prev[accountId],
        balance: newBalance
      }
    }));
  };

  const transferFunds = (from: AccountType, to: AccountType, amount: number) => {
    setAccounts(prev => ({
      ...prev,
      [from]: {
        ...prev[from],
        balance: prev[from].balance - amount
      },
      [to]: {
        ...prev[to],
        balance: prev[to].balance + amount
      }
    }));
  };

  const getAccount = (accountId: AccountType): Account => {
    return accounts[accountId];
  };

  return (
    <AccountContext.Provider value={{ accounts, updateBalance, transferFunds, getAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccounts = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccounts must be used within an AccountProvider');
  }
  return context;
};
