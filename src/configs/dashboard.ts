const TAX_SUMMARY_HEADERS = [
	{
		label: "Period",
		key: "label",
	},
	{
		label: "PnL",
		key: "pnl",
	},
	{
		label: "Commission",
		key: "commission",
	},
	{
		label: "Fee",
		key: "fee",
	},
	{
		label: "Swap",
		key: "swap",
	},
	{
		label: "Net",
		key: "net",
	},
] as const;

const DEFAULT_PROGRESS_METRICS: Pages.Dashboard.ProgressMetrics = {
	monthlyProgress: 0,
	monthlyPercent: 0,
	yearlyProgress: 0,
	weeklyProgress: 0,
	dailyProgress: 0,
	weeklyPercent: 0,
	yearlyPercent: 0,
	dailyPercent: 0,
	monthTarget: 0,
	weekTarget: 0,
	yearTarget: 0,
	dayTarget: 0,
	dPnl: 0,
	wPnl: 0,
	mPnl: 0,
	yPnl: 0,
} as const;

const DEFAULT_STATS: Pages.Dashboard.StatGridData = {
	balanceDisplay: "$0.00",
	tradesCount: 0,
	winRate: null,
	monthlyPnl: 0,
	weeklyPnl: 0,
	yearlyPnl: 0,
	totalPnl: 0,
	dailyPnl: 0,
	wins: 0,
	avgWin: 0,
	losses: 0,
	avgLoss: 0,
} as const;

const DEFAULT_GOALS: Trade.Goals = {
	currency: "USD",
} as const;

const DEFAULT_TRADES: Trade.PositionTrade[] = [] as const;

export const DASHBOARD_CONFIG = {
	DEFAULT_PROGRESS_METRICS,
	TAX_SUMMARY_HEADERS,
	DEFAULT_TRADES,
	DEFAULT_GOALS,
	DEFAULT_STATS,
} as const;
