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
					<SelectTrigger className="w-full mb-6 bg-white dark:bg-[#211E1E] border-border h-14">
						<SelectValue>
							<div className="flex items-center gap-3">
								<div
									className="w-10 h-10 flex items-center justify-center rounded-[4px] bg-[#F3F3F3] dark:bg-black text-2xl"
									style={{
										color: account.color,
										lineHeight: 1,
									}}
								>
									{account.icon}
								</div>
								<div className="flex flex-col items-start">
									<span className="font-medium text-foreground">
										{account.name}
									</span>
									<span className="text-sm text-muted-foreground">
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
