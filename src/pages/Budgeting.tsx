import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccounts, AccountType } from "@/contexts/AccountContext";
import {
	Settings,
	Car,
	Home,
	ShoppingBasket,
	UtensilsCrossed,
	Film,
	ChevronDown,
	ArrowDown,
	ArrowUp,
	ArrowRightLeft,
	TrendingUp,
	CreditCard,
	Target,
	Bell,
	HelpCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Label } from "recharts";
import { BottomNavigation } from "@/components/BottomNavigation";
import { AccountActions } from "@/components/AccountActions";

interface BudgetCategory {
	id: string;
	name: string;
	icon: React.ReactNode;
	date: string;
	spent: number;
	target: number;
	color: string;
}

const budgetCategories: Record<"savings" | "currentAccount", BudgetCategory[]> =
	{
		savings: [
			{
				id: "new-car",
				name: "New car",
				icon: <Car className="w-5 h-5" />,
				date: "May 2028",
				spent: 6050,
				target: 12000,
				color: "#A488F5",
			},
			{
				id: "home-renovation",
				name: "Home renovation",
				icon: <Home className="w-5 h-5" />,
				date: "March 2027",
				spent: 10200,
				target: 25000,
				color: "#C7B6FB",
			},
		],
		currentAccount: [
			{
				id: "groceries",
				name: "Groceries",
				icon: <ShoppingBasket className="w-5 h-5" />,
				date: "This month",
				spent: 250,
				target: 500,
				color: "#E4B33D",
			},
			{
				id: "restaurants",
				name: "Restaurants",
				icon: <UtensilsCrossed className="w-5 h-5" />,
				date: "This month",
				spent: 125,
				target: 200,
				color: "#ECCA77",
			},
			{
				id: "entertainment",
				name: "Entertainment",
				icon: <Film className="w-5 h-5" />,
				date: "This month",
				spent: 135,
				target: 300,
				color: "#F4E1B1",
			},
		],
	};

function formatCurrency(value: number) {
	return `£${value.toLocaleString("en-GB", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
}

const savingsActions = [
	{
		label: "Trends",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M21.75 19.5C21.75 19.6989 21.671 19.8897 21.5303 20.0303C21.3897 20.171 21.1989 20.25 21 20.25H3C2.80109 20.25 2.61032 20.171 2.46967 20.0303C2.32902 19.8897 2.25 19.6989 2.25 19.5C2.25 19.3011 2.32902 19.1103 2.46967 18.9697C2.61032 18.829 2.80109 18.75 3 18.75H3.75V12.75C3.75 12.5511 3.82902 12.3603 3.96967 12.2197C4.11032 12.079 4.30109 12 4.5 12H6.75C6.94891 12 7.13968 12.079 7.28033 12.2197C7.42098 12.3603 7.5 12.5511 7.5 12.75V18.75H9V8.25C9 8.05109 9.07902 7.86032 9.21967 7.71967C9.36032 7.57902 9.55109 7.5 9.75 7.5H12.75C12.9489 7.5 13.1397 7.57902 13.2803 7.71967C13.421 7.86032 13.5 8.05109 13.5 8.25V18.75H15V3.75C15 3.55109 15.079 3.36032 15.2197 3.21967C15.3603 3.07902 15.5511 3 15.75 3H19.5C19.6989 3 19.8897 3.07902 20.0303 3.21967C20.171 3.36032 20.25 3.55109 20.25 3.75V18.75H21C21.1989 18.75 21.3897 18.829 21.5303 18.9697C21.671 19.1103 21.75 19.3011 21.75 19.5Z"
					fill="#A488F5"
				/>
			</svg>
		),
	},
	{
		label: "Spending",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M22.4999 5.25V11.25C22.5 11.3984 22.4561 11.5435 22.3737 11.667C22.2913 11.7904 22.1741 11.8867 22.037 11.9435C21.8999 12.0003 21.749 12.0151 21.6034 11.9861C21.4579 11.9572 21.3242 11.8856 21.2193 11.7806L18.7499 9.31031L13.2806 14.7806C13.2109 14.8504 13.1282 14.9057 13.0371 14.9434C12.9461 14.9812 12.8485 15.0006 12.7499 15.0006C12.6514 15.0006 12.5538 14.9812 12.4627 14.9434C12.3717 14.9057 12.289 14.8504 12.2193 14.7806L8.99993 11.5603L2.78055 17.7806C2.63982 17.9214 2.44895 18.0004 2.24993 18.0004C2.05091 18.0004 1.86003 17.9214 1.7193 17.7806C1.57857 17.6399 1.49951 17.449 1.49951 17.25C1.49951 17.051 1.57857 16.8601 1.7193 16.7194L8.4693 9.96938C8.53896 9.89964 8.62168 9.84432 8.71272 9.80658C8.80377 9.76884 8.90137 9.74941 8.99993 9.74941C9.09849 9.74941 9.19609 9.76884 9.28713 9.80658C9.37818 9.84432 9.4609 9.89964 9.53055 9.96938L12.7499 13.1897L17.6896 8.25L15.2193 5.78063C15.1143 5.67573 15.0428 5.54204 15.0138 5.39648C14.9848 5.25092 14.9996 5.10002 15.0565 4.96291C15.1133 4.82579 15.2095 4.70861 15.3329 4.62621C15.4564 4.54381 15.6015 4.49988 15.7499 4.5H21.7499C21.9488 4.5 22.1396 4.57902 22.2803 4.71967C22.4209 4.86032 22.4999 5.05109 22.4999 5.25Z"
					fill="#A488F5"
				/>
			</svg>
		),
	},
	{
		label: "Goals",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M20.8004 7.79614C21.8412 9.97282 22.0387 12.4579 21.355 14.7717C20.6713 17.0855 19.1547 19.064 17.098 20.3253C15.0413 21.5867 12.5902 22.0416 10.2179 21.602C7.84557 21.1625 5.72013 19.8598 4.25179 17.9454C2.78344 16.0309 2.0763 13.6405 2.26682 11.2353C2.45735 8.83012 3.53204 6.58078 5.28348 4.92139C7.03492 3.26199 9.33895 2.31018 11.7509 2.24966C14.1628 2.18913 16.5117 3.02418 18.3442 4.59363L20.4695 2.46738C20.6102 2.32665 20.8011 2.24759 21.0001 2.24759C21.1991 2.24759 21.39 2.32665 21.5307 2.46738C21.6715 2.60812 21.7505 2.79899 21.7505 2.99801C21.7505 3.19703 21.6715 3.3879 21.5307 3.52863L15.7126 9.3477L12.1773 12.883L9.93198 15.1283C10.5125 15.5123 11.1883 15.7271 11.884 15.7488C12.5796 15.7704 13.2675 15.5981 13.8708 15.251C14.474 14.904 14.9688 14.3959 15.2997 13.7836C15.6306 13.1713 15.7846 12.4791 15.7445 11.7843C15.7333 11.5853 15.8016 11.3901 15.9343 11.2416C16.0671 11.093 16.2534 11.0033 16.4523 10.9921C16.6512 10.9809 16.8464 11.0492 16.995 11.1819C17.1435 11.3147 17.2333 11.501 17.2445 11.6999C17.305 12.7619 17.0414 13.8172 16.4888 14.7261C15.9361 15.635 15.1204 16.3546 14.1497 16.7895C13.1789 17.2245 12.099 17.3543 11.0528 17.1618C10.0067 16.9692 9.04366 16.4635 8.29136 15.7114C7.35571 14.7723 6.81 13.514 6.76379 12.1891C6.71758 10.8642 7.1743 9.57089 8.04224 8.56884C8.91018 7.56678 10.1251 6.93018 11.443 6.78685C12.7609 6.64353 14.0842 7.00409 15.1473 7.79614L17.2782 5.66145C15.7152 4.36376 13.7279 3.68929 11.6979 3.76758C9.66793 3.84587 7.73844 4.67141 6.28003 6.08563C4.82163 7.49986 3.93715 9.40304 3.79646 11.4297C3.65578 13.4563 4.26881 15.4634 5.51782 17.0656C6.76683 18.6678 8.56375 19.752 10.5634 20.11C12.5631 20.468 14.6246 20.0746 16.3519 19.0053C18.0792 17.9361 19.3506 16.2663 19.9218 14.3168C20.493 12.3672 20.3238 10.2754 19.4467 8.44301C19.3609 8.26349 19.3499 8.05725 19.4162 7.86965C19.4825 7.68206 19.6206 7.52848 19.8001 7.4427C19.9796 7.35692 20.1859 7.34596 20.3735 7.41224C20.5611 7.47853 20.7146 7.61662 20.8004 7.79614Z"
					fill="#A488F5"
				/>
			</svg>
		),
	},
	{
		label: "Notifications",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M15.7499 21C15.7499 21.1989 15.6709 21.3897 15.5302 21.5303C15.3896 21.671 15.1988 21.75 14.9999 21.75H8.99989C8.80098 21.75 8.61021 21.671 8.46956 21.5303C8.32891 21.3897 8.24989 21.1989 8.24989 21C8.24989 20.8011 8.32891 20.6103 8.46956 20.4697C8.61021 20.329 8.80098 20.25 8.99989 20.25H14.9999C15.1988 20.25 15.3896 20.329 15.5302 20.4697C15.6709 20.6103 15.7499 20.8011 15.7499 21ZM20.7946 16.4944C20.2733 15.5981 19.4999 13.0622 19.4999 9.75C19.4999 7.76088 18.7097 5.85322 17.3032 4.4467C15.8967 3.04018 13.989 2.25 11.9999 2.25C10.0108 2.25 8.10311 3.04018 6.69659 4.4467C5.29007 5.85322 4.49989 7.76088 4.49989 9.75C4.49989 13.0631 3.72551 15.5981 3.2052 16.4944C3.07233 16.7222 3.00189 16.9811 3.00099 17.2449C3.00008 17.5086 3.06874 17.768 3.20005 17.9967C3.33135 18.2255 3.52065 18.4156 3.74886 18.5478C3.97708 18.6801 4.23613 18.7498 4.49989 18.75H19.4999C19.7636 18.7496 20.0225 18.6798 20.2506 18.5475C20.4787 18.4151 20.6678 18.225 20.799 17.9963C20.9302 17.7676 20.9988 17.5083 20.9979 17.2446C20.9969 16.9809 20.9265 16.7222 20.7936 16.4944H20.7946Z"
					fill="#A488F5"
				/>
			</svg>
		),
	},
	{
		label: "Help",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96452 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12 18C11.7775 18 11.56 17.934 11.375 17.8104C11.19 17.6868 11.0458 17.5111 10.9606 17.3055C10.8755 17.1 10.8532 16.8738 10.8966 16.6555C10.94 16.4373 11.0472 16.2368 11.2045 16.0795C11.3618 15.9222 11.5623 15.815 11.7805 15.7716C11.9988 15.7282 12.225 15.7505 12.4305 15.8356C12.6361 15.9208 12.8118 16.065 12.9354 16.25C13.059 16.435 13.125 16.6525 13.125 16.875C13.125 17.1734 13.0065 17.4595 12.7955 17.6705C12.5845 17.8815 12.2984 18 12 18ZM12.75 13.4325V13.5C12.75 13.6989 12.671 13.8897 12.5303 14.0303C12.3897 14.171 12.1989 14.25 12 14.25C11.8011 14.25 11.6103 14.171 11.4697 14.0303C11.329 13.8897 11.25 13.6989 11.25 13.5V12.75C11.25 12.5511 11.329 12.3603 11.4697 12.2197C11.6103 12.079 11.8011 12 12 12C13.2403 12 14.25 11.1562 14.25 10.125C14.25 9.09375 13.2403 8.25 12 8.25C10.7597 8.25 9.75 9.09375 9.75 10.125V10.5C9.75 10.6989 9.67099 10.8897 9.53033 11.0303C9.38968 11.171 9.19892 11.25 9 11.25C8.80109 11.25 8.61033 11.171 8.46967 11.0303C8.32902 10.8897 8.25 10.6989 8.25 10.5V10.125C8.25 8.26406 9.93188 6.75 12 6.75C14.0681 6.75 15.75 8.26406 15.75 10.125C15.75 11.7544 14.46 13.1184 12.75 13.4325Z"
					fill="#A488F5"
				/>
			</svg>
		),
	},
];

const currentAccountActions = [
	{
		label: "Trends",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M21.75 19.5C21.75 19.6989 21.671 19.8897 21.5303 20.0303C21.3897 20.171 21.1989 20.25 21 20.25H3C2.80109 20.25 2.61032 20.171 2.46967 20.0303C2.32902 19.8897 2.25 19.6989 2.25 19.5C2.25 19.3011 2.32902 19.1103 2.46967 18.9697C2.61032 18.829 2.80109 18.75 3 18.75H3.75V12.75C3.75 12.5511 3.82902 12.3603 3.96967 12.2197C4.11032 12.079 4.30109 12 4.5 12H6.75C6.94891 12 7.13968 12.079 7.28033 12.2197C7.42098 12.3603 7.5 12.5511 7.5 12.75V18.75H9V8.25C9 8.05109 9.07902 7.86032 9.21967 7.71967C9.36032 7.57902 9.55109 7.5 9.75 7.5H12.75C12.9489 7.5 13.1397 7.57902 13.2803 7.71967C13.421 7.86032 13.5 8.05109 13.5 8.25V18.75H15V3.75C15 3.55109 15.079 3.36032 15.2197 3.21967C15.3603 3.07902 15.5511 3 15.75 3H19.5C19.6989 3 19.8897 3.07902 20.0303 3.21967C20.171 3.36032 20.25 3.55109 20.25 3.75V18.75H21C21.1989 18.75 21.3897 18.829 21.5303 18.9697C21.671 19.1103 21.75 19.3011 21.75 19.5Z"
					fill="#E4B33D"
				/>
			</svg>
		),
	},
	{
		label: "Spending",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M22.4999 5.25V11.25C22.5 11.3984 22.4561 11.5435 22.3737 11.667C22.2913 11.7904 22.1741 11.8867 22.037 11.9435C21.8999 12.0003 21.749 12.0151 21.6034 11.9861C21.4579 11.9572 21.3242 11.8856 21.2193 11.7806L18.7499 9.31031L13.2806 14.7806C13.2109 14.8504 13.1282 14.9057 13.0371 14.9434C12.9461 14.9812 12.8485 15.0006 12.7499 15.0006C12.6514 15.0006 12.5538 14.9812 12.4627 14.9434C12.3717 14.9057 12.289 14.8504 12.2193 14.7806L8.99993 11.5603L2.78055 17.7806C2.63982 17.9214 2.44895 18.0004 2.24993 18.0004C2.05091 18.0004 1.86003 17.9214 1.7193 17.7806C1.57857 17.6399 1.49951 17.449 1.49951 17.25C1.49951 17.051 1.57857 16.8601 1.7193 16.7194L8.4693 9.96938C8.53896 9.89964 8.62168 9.84432 8.71272 9.80658C8.80377 9.76884 8.90137 9.74941 8.99993 9.74941C9.09849 9.74941 9.19609 9.76884 9.28713 9.80658C9.37818 9.84432 9.4609 9.89964 9.53055 9.96938L12.7499 13.1897L17.6896 8.25L15.2193 5.78063C15.1143 5.67573 15.0428 5.54204 15.0138 5.39648C14.9848 5.25092 14.9996 5.10002 15.0565 4.96291C15.1133 4.82579 15.2095 4.70861 15.3329 4.62621C15.4564 4.54381 15.6015 4.49988 15.7499 4.5H21.7499C21.9488 4.5 22.1396 4.57902 22.2803 4.71967C22.4209 4.86032 22.4999 5.05109 22.4999 5.25Z"
					fill="#E4B33D"
				/>
			</svg>
		),
	},
	{
		label: "Goals",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M20.8004 7.79614C21.8412 9.97282 22.0387 12.4579 21.355 14.7717C20.6713 17.0855 19.1547 19.064 17.098 20.3253C15.0413 21.5867 12.5902 22.0416 10.2179 21.602C7.84557 21.1625 5.72013 19.8598 4.25179 17.9454C2.78344 16.0309 2.0763 13.6405 2.26682 11.2353C2.45735 8.83012 3.53204 6.58078 5.28348 4.92139C7.03492 3.26199 9.33895 2.31018 11.7509 2.24966C14.1628 2.18913 16.5117 3.02418 18.3442 4.59363L20.4695 2.46738C20.6102 2.32665 20.8011 2.24759 21.0001 2.24759C21.1991 2.24759 21.39 2.32665 21.5307 2.46738C21.6715 2.60812 21.7505 2.79899 21.7505 2.99801C21.7505 3.19703 21.6715 3.3879 21.5307 3.52863L15.7126 9.3477L12.1773 12.883L9.93198 15.1283C10.5125 15.5123 11.1883 15.7271 11.884 15.7488C12.5796 15.7704 13.2675 15.5981 13.8708 15.251C14.474 14.904 14.9688 14.3959 15.2997 13.7836C15.6306 13.1713 15.7846 12.4791 15.7445 11.7843C15.7333 11.5853 15.8016 11.3901 15.9343 11.2416C16.0671 11.093 16.2534 11.0033 16.4523 10.9921C16.6512 10.9809 16.8464 11.0492 16.995 11.1819C17.1435 11.3147 17.2333 11.501 17.2445 11.6999C17.305 12.7619 17.0414 13.8172 16.4888 14.7261C15.9361 15.635 15.1204 16.3546 14.1497 16.7895C13.1789 17.2245 12.099 17.3543 11.0528 17.1618C10.0067 16.9692 9.04366 16.4635 8.29136 15.7114C7.35571 14.7723 6.81 13.514 6.76379 12.1891C6.71758 10.8642 7.1743 9.57089 8.04224 8.56884C8.91018 7.56678 10.1251 6.93018 11.443 6.78685C12.7609 6.64353 14.0842 7.00409 15.1473 7.79614L17.2782 5.66145C15.7152 4.36376 13.7279 3.68929 11.6979 3.76758C9.66793 3.84587 7.73844 4.67141 6.28003 6.08563C4.82163 7.49986 3.93715 9.40304 3.79646 11.4297C3.65578 13.4563 4.26881 15.4634 5.51782 17.0656C6.76683 18.6678 8.56375 19.752 10.5634 20.11C12.5631 20.468 14.6246 20.0746 16.3519 19.0053C18.0792 17.9361 19.3506 16.2663 19.9218 14.3168C20.493 12.3672 20.3238 10.2754 19.4467 8.44301C19.3609 8.26349 19.3499 8.05725 19.4162 7.86965C19.4825 7.68206 19.6206 7.52848 19.8001 7.4427C19.9796 7.35692 20.1859 7.34596 20.3735 7.41224C20.5611 7.47853 20.7146 7.61662 20.8004 7.79614Z"
					fill="#E4B33D"
				/>
			</svg>
		),
	},
	{
		label: "Notifications",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M15.7499 21C15.7499 21.1989 15.6709 21.3897 15.5302 21.5303C15.3896 21.671 15.1988 21.75 14.9999 21.75H8.99989C8.80098 21.75 8.61021 21.671 8.46956 21.5303C8.32891 21.3897 8.24989 21.1989 8.24989 21C8.24989 20.8011 8.32891 20.6103 8.46956 20.4697C8.61021 20.329 8.80098 20.25 8.99989 20.25H14.9999C15.1988 20.25 15.3896 20.329 15.5302 20.4697C15.6709 20.6103 15.7499 20.8011 15.7499 21ZM20.7946 16.4944C20.2733 15.5981 19.4999 13.0622 19.4999 9.75C19.4999 7.76088 18.7097 5.85322 17.3032 4.4467C15.8967 3.04018 13.989 2.25 11.9999 2.25C10.0108 2.25 8.10311 3.04018 6.69659 4.4467C5.29007 5.85322 4.49989 7.76088 4.49989 9.75C4.49989 13.0631 3.72551 15.5981 3.2052 16.4944C3.07233 16.7222 3.00189 16.9811 3.00099 17.2449C3.00008 17.5086 3.06874 17.768 3.20005 17.9967C3.33135 18.2255 3.52065 18.4156 3.74886 18.5478C3.97708 18.6801 4.23613 18.7498 4.49989 18.75H19.4999C19.7636 18.7496 20.0225 18.6798 20.2506 18.5475C20.4787 18.4151 20.6678 18.225 20.799 17.9963C20.9302 17.7676 20.9988 17.5083 20.9979 17.2446C20.9969 16.9809 20.9265 16.7222 20.7936 16.4944H20.7946Z"
					fill="#E4B33D"
				/>
			</svg>
		),
	},
	{
		label: "Help",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12 18C11.7775 18 11.56 17.934 11.375 17.8104C11.19 17.6868 11.0458 17.5111 10.9606 17.3055C10.8755 17.1 10.8532 16.8738 10.8966 16.6555C10.94 16.4373 11.0472 16.2368 11.2045 16.0795C11.3618 15.9222 11.5623 15.815 11.7805 15.7716C11.9988 15.7282 12.225 15.7505 12.4305 15.8356C12.6361 15.9208 12.8118 16.065 12.9354 16.25C13.059 16.435 13.125 16.6525 13.125 16.875C13.125 17.1734 13.0065 17.4595 12.7955 17.6705C12.5845 17.8815 12.2984 18 12 18ZM12.75 13.4325V13.5C12.75 13.6989 12.671 13.8897 12.5303 14.0303C12.3897 14.171 12.1989 14.25 12 14.25C11.8011 14.25 11.6103 14.171 11.4697 14.0303C11.329 13.8897 11.25 13.6989 11.25 13.5V12.75C11.25 12.5511 11.329 12.3603 11.4697 12.2197C11.6103 12.079 11.8011 12 12 12C13.2403 12 14.25 11.1562 14.25 10.125C14.25 9.09375 13.2403 8.25 12 8.25C10.7597 8.25 9.75 9.09375 9.75 10.125V10.5C9.75 10.6989 9.67099 10.8897 9.53033 11.0303C9.38968 11.171 9.19892 11.25 9 11.25C8.80109 11.25 8.61033 11.171 8.46967 11.0303C8.32902 10.8897 8.25 10.6989 8.25 10.5V10.125C8.25 8.26406 9.93188 6.75 12 6.75C14.0681 6.75 15.75 8.26406 15.75 10.125C15.75 11.7544 14.46 13.1184 12.75 13.4325Z"
					fill="#E4B33D"
				/>
			</svg>
		),
	},
];

function formatDate(date: Date) {
	const d = new Date(date);
	const day = d.getDate().toString().padStart(2, "0");
	const month = d.toLocaleString("en-GB", { month: "short" });
	const year = d.getFullYear();
	const time = d.toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
	return `${day} ${month} ${year}, ${time}`;
}

function getTransactionIcon(type: string) {
	switch (type) {
		case "withdrawal":
			return <ArrowDown className="w-5 h-5 text-[#211E1E] dark:text-white" />;
		case "topup":
			return <ArrowUp className="w-5 h-5 text-[#211E1E] dark:text-white" />;
		case "transfer":
			return (
				<ArrowRightLeft className="w-5 h-5 text-[#211E1E] dark:text-white" />
			);
		default:
			return null;
	}
}

function getTransactionLabel(type: string) {
	switch (type) {
		case "withdrawal":
			return "Withdrawal";
		case "topup":
			return "Top up";
		case "transfer":
			return "Transfer";
		default:
			return type;
	}
}

const Budgeting: React.FC = () => {
	const navigate = useNavigate();
	const { accounts, transactions } = useAccounts();
	const [selectedAccount, setSelectedAccount] = useState<
		"savings" | "currentAccount"
	>("currentAccount");

	const currentCategories = budgetCategories[selectedAccount];
	const account = accounts[selectedAccount];

	const filteredTransactions = transactions
		.filter((t) => t.account === selectedAccount)
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.slice(0, 5);

	// Prepare chart data and config
	const chartData = currentCategories.map((cat, index) => ({
		category: cat.name,
		amount: cat.spent,
		fill: cat.color,
	}));

	const totalSpent = currentCategories.reduce((sum, cat) => sum + cat.spent, 0);

	const chartConfig: ChartConfig = currentCategories.reduce((config, cat) => {
		config[cat.id] = {
			label: cat.name,
			color: cat.color,
		};
		return config;
	}, {} as ChartConfig);

	return (
		<div className="min-h-screen bg-[#F3F3F3] dark:bg-black text-foreground max-w-[480px] mx-auto flex flex-col pb-[100px]">
			<div className="px-4 py-6 flex flex-col flex-1">
				{/* Header */}
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-2xl font-semibold text-foreground">Budgeting</h1>
					<button
						className="w-10 h-10 rounded-full bg-white dark:bg-[#211E1E] flex items-center justify-center"
						onClick={() => {
							/* Settings action */
						}}
					>
						<Settings className="w-5 h-5 text-foreground" />
					</button>
				</div>

				{/* Subtitle */}
				<p className="text-sm text-muted-foreground mb-6">
					Set targets for saving categories so you can keep track of your
					spending.
				</p>

				{/* Account Dropdown */}
				<Select
					value={selectedAccount}
					onValueChange={(value) =>
						setSelectedAccount(value as "savings" | "currentAccount")
					}
				>
					<SelectTrigger className="w-full mb-6 bg-white dark:bg-[#211E1E] border-border h-20 [&>span]:pointer-events-auto">
						<SelectValue>
							<div className="flex items-center justify-between w-full gap-4">
								{/* Left side - Icon and Account info */}
								<div className="flex items-center gap-3">
									<div
										className="w-12 h-12 flex items-center justify-center rounded-2xl bg-black text-3xl"
										style={{
											color: account.color,
											lineHeight: 1,
										}}
									>
										{account.icon}
									</div>
									<div className="flex flex-col items-start">
										<span className="text-sm text-muted-foreground">
											Account
										</span>
										<span className="text-foreground text-sm">
											{account.name}
										</span>
									</div>
								</div>

								{/* Right side - Balance info */}
								<div className="flex flex-col items-end">
									<span className="text-sm text-muted-foreground">Balance</span>
									<span className="text-sm text-foreground">
										{formatCurrency(account.balance)}
									</span>
								</div>
							</div>
						</SelectValue>
					</SelectTrigger>
					<SelectContent className="bg-white dark:bg-[#211E1E] border-border z-50">
						<SelectItem value="savings">
							<div className="flex items-center gap-3">
								<div
									className="w-10 h-10 flex items-center justify-center rounded-[4px] bg-[#F3F3F3] dark:bg-black text-2xl"
									style={{ color: accounts.savings.color }}
								>
									{accounts.savings.icon}
								</div>
								<div className="flex flex-col items-start">
									<span className="font-medium">Savings account</span>
									<span className="text-sm text-muted-foreground">
										{formatCurrency(accounts.savings.balance)}
									</span>
								</div>
							</div>
						</SelectItem>
						<SelectItem value="currentAccount">
							<div className="flex items-center gap-3">
								<div
									className="w-10 h-10 flex items-center justify-center rounded-[4px] bg-[#F3F3F3] dark:bg-black text-2xl"
									style={{ color: accounts.currentAccount.color }}
								>
									{accounts.currentAccount.icon}
								</div>
								<div className="flex flex-col items-start">
									<span className="font-medium">Current account</span>
									<span className="text-sm text-muted-foreground">
										{formatCurrency(accounts.currentAccount.balance)}
									</span>
								</div>
							</div>
						</SelectItem>
					</SelectContent>
				</Select>

				{/* Actions Section */}
				<div className="mb-6">
					<AccountActions
						actions={
							selectedAccount === "savings"
								? savingsActions
								: currentAccountActions
						}
					/>
				</div>

				{/* Categories Section */}
				<div className="mb-6">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-lg font-semibold text-foreground">
							Categories
						</h2>
						<button className="text-sm text-[#A488F5] font-medium">Edit</button>
					</div>

					<div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
						{currentCategories.map((category) => {
							const percentage = (category.spent / category.target) * 100;
							return (
								<div
									key={category.id}
									className="min-w-[280px] bg-white dark:bg-[#211E1E] rounded-xl p-4 border border-border shadow-sm"
								>
									<div className="flex items-start justify-between mb-3">
										<div className="flex items-center gap-3">
											<div
												className="w-10 h-10 rounded-full flex items-center justify-center text-white"
												style={{ backgroundColor: category.color }}
											>
												{category.icon}
											</div>
											<div>
												<h3 className="font-medium text-foreground">
													{category.name}
												</h3>
												<p className="text-xs text-muted-foreground">
													{category.date}
												</p>
											</div>
										</div>
									</div>

									<Progress
										value={percentage}
										className="mb-2 h-1"
										style={{
											["--progress-background" as any]: category.color,
											backgroundColor: "#D9D9D9",
										}}
									/>

									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">
											{formatCurrency(category.spent)} /{" "}
											{formatCurrency(category.target)}
										</span>
										<span className="font-medium text-foreground">
											{percentage.toFixed(0)}%
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Chart Section */}
				<div className="bg-white dark:bg-[#211E1E] rounded-xl p-6 border border-border mb-6">
					<h2 className="text-lg font-semibold text-foreground mb-4">
						Saving by category
					</h2>
					<ChartContainer
						config={chartConfig}
						className="mx-auto aspect-square max-h-[250px]"
					>
						<PieChart>
							<Pie
								data={chartData}
								dataKey="amount"
								nameKey="category"
								innerRadius={70}
								strokeWidth={3}
							>
								<Label
									content={({ viewBox }) => {
										if (viewBox && "cx" in viewBox && "cy" in viewBox) {
											return (
												<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
													<tspan
														x={viewBox.cx}
														y={(viewBox.cy || 0) - 10}
														className="fill-muted-foreground text-xs"
													>
														Total spending
													</tspan>
													<tspan
														x={viewBox.cx}
														y={(viewBox.cy || 0) + 10}
														className="fill-foreground text-lg font-semibold"
													>
														{formatCurrency(totalSpent)}
													</tspan>
												</text>
											);
										}
									}}
								/>
							</Pie>
						</PieChart>
					</ChartContainer>

					{/* Legend */}
					<div className="flex flex-col gap-2 mt-4">
						{currentCategories.map((cat) => (
							<div key={cat.id} className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div
										className="w-3 h-3 rounded-full"
										style={{ backgroundColor: cat.color }}
									/>
									<span className="text-sm text-foreground">{cat.name}</span>
								</div>
								<span className="text-sm font-medium text-foreground">
									{formatCurrency(cat.spent)}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Transactions Section */}
				<div>
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-lg font-semibold text-foreground">
							Recent transactions
						</h2>
						<button
							className="text-sm text-[#A488F5] font-medium"
							onClick={() => navigate("/transactions")}
						>
							See all
						</button>
					</div>

					{filteredTransactions.length === 0 ? (
						<div className="text-center py-8 text-muted-foreground">
							No transactions yet
						</div>
					) : (
						<div className="space-y-3">
							{filteredTransactions.map((transaction) => (
								<div
									key={transaction.id}
									className="flex items-center gap-4 py-4 border-b border-[#E5E5EA] dark:border-[#2C2C2E] cursor-pointer hover:bg-[#E5E5EA] dark:hover:bg-[#1C1C1E]/30 transition-colors"
									onClick={() => {
										/* Could navigate to transaction detail */
									}}
								>
									<div className="w-12 h-12 rounded-lg bg-white dark:bg-[#2C2C2E] flex items-center justify-center flex-shrink-0">
										{getTransactionIcon(transaction.type)}
									</div>
									<div className="flex-1 min-w-0">
										<div className="text-foreground text-base font-medium">
											{getTransactionLabel(transaction.type)}
										</div>
										<div className="text-[#8E8E93] text-sm">
											{formatDate(transaction.date)}
										</div>
									</div>
									<div
										className={`text-lg font-semibold ${
											transaction.amount >= 0
												? "text-[#34C759]"
												: "text-foreground"
										}`}
									>
										{transaction.amount >= 0 ? "+ " : "- "}£{" "}
										{Math.abs(transaction.amount).toFixed(2)}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
				<div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto">
					<BottomNavigation />
				</div>
			</div>
		</div>
	);
};

export default Budgeting;
