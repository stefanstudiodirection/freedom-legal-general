import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, ArrowUpDown, BookOpen, User } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    path: "/",
    icon: <Home className="w-6 h-6" />,
  },
  {
    id: "transactions",
    label: "Transactions",
    path: "/transactions",
    icon: <ArrowUpDown className="w-6 h-6" />,
  },
  {
    id: "learn",
    label: "Learn",
    path: "/learn",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: "profile",
    label: "Profile",
    path: "/profile",
    icon: <User className="w-6 h-6" />,
  },
];

export const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="items-center flex w-full text-sm text-white font-normal whitespace-nowrap text-center leading-[1.2] bg-black pt-4 pb-6 px-2 border-t border-t-[#2C2C2E] fixed bottom-0 left-0 right-0 z-50">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`self-stretch flex flex-col items-center flex-1 shrink basis-[0%] my-auto hover:opacity-80 transition-opacity ${
            isActive(item.path) ? "text-[#A488F5]" : "text-gray-400"
          }`}
          onClick={() => navigate(item.path)}
          aria-pressed={isActive(item.path)}
        >
          <div className={isActive(item.path) ? "text-[#A488F5]" : "text-gray-400"}>
            {item.icon}
          </div>
          <span className={`mt-1 text-xs ${isActive(item.path) ? "text-[#A488F5]" : "text-gray-400"}`}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};
