import { useTradeAccountState, useTradeCurrency, useTradeTradesState } from "@/hooks";
import { formatMoney, formatSignedMoney, getPositionPnl } from "@/utils";
import { DASHBOARD_CONFIG } from "@/configs";
import { useMemo, type JSX } from "react";

const { DEFAULT_STATS } = DASHBOARD_CONFIG;

const buildStatGridRows = (p: Pages.Dashboard.StatGridData, moneyFormatter: Intl.NumberFormat): Pages.Dashboard.StatGridRow[] => [
	{ label: "Balance", value: p.balanceDisplay, color: "var(--text)" },
	{ label: "Daily P&L", value: formatSignedMoney(p.dailyPnl, moneyFormatter), color: p.dailyPnl >= 0 ? "var(--green)" : "var(--red)" },
	{ label: "Weekly P&L", value: formatSignedMoney(p.weeklyPnl, moneyFormatter), color: p.weeklyPnl >= 0 ? "var(--green)" : "var(--red)" },
	{ label: "Monthly P&L", value: formatSignedMoney(p.monthlyPnl, moneyFormatter), color: p.monthlyPnl >= 0 ? "var(--green)" : "var(--red)" },
	{ label: "Yearly P&L", value: formatSignedMoney(p.yearlyPnl, moneyFormatter), color: p.yearlyPnl >= 0 ? "var(--green)" : "var(--red)" },
	{ label: "Total P&L", value: formatSignedMoney(p.totalPnl, moneyFormatter), color: p.totalPnl >= 0 ? "var(--green)" : "var(--red)" },
	{ label: "Win rate", value: p.winRate !== null ? `${p.winRate}%` : "—", color: p.winRate !== null && p.winRate >= 50 ? "var(--green)" : "var(--amber)" },
	{ label: "Trades", value: String(p.tradesCount), color: "var(--text)" },
	{ label: "Avg win", value: p.wins ? formatSignedMoney(p.avgWin, moneyFormatter) : "—", color: "var(--green)" },
	{ label: "Avg loss", value: p.losses ? formatSignedMoney(p.avgLoss, moneyFormatter) : "—", color: "var(--red)" },
];

function StatGrid(): JSX.Element {
	const moneyFormatter = useTradeCurrency();
	const account = useTradeAccountState();
	const trades = useTradeTradesState();

	const tradePnls = trades?.map(getPositionPnl) ?? [];
	const tradesCount = tradePnls.length;

	const totalPnl = tradePnls.reduce((sum, pnl) => sum + pnl, 0);

	const losses = tradePnls.filter((pnl) => pnl < 0).length;
	const wins = tradePnls.filter((pnl) => pnl > 0).length;

	const avgLoss = losses ? tradePnls.filter((pnl) => pnl < 0).reduce((a, pnl) => a + pnl, 0) / losses : 0;
	const avgWin = wins ? tradePnls.filter((pnl) => pnl > 0).reduce((a, pnl) => a + pnl, 0) / wins : 0;
	const winRate = tradesCount ? Math.round((wins / tradesCount) * 100) : null;

	const now = new Date();
	const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
	const weekStart = new Date(dayStart - ((now.getDay() + 6) % 7) * 24 * 60 * 60 * 1000).getTime();
	const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
	const yearStart = new Date(now.getFullYear(), 0, 1).getTime();

	const { dailyPnl, weeklyPnl, monthlyPnl, yearlyPnl } = useMemo(() => {
		let daily = 0;
		let weekly = 0;
		let monthly = 0;
		let yearly = 0;

		(trades ?? []).forEach((trade) => {
			const closeTime = trade.closes[0]?.time_msc ?? 0;
			const pnl = getPositionPnl(trade);

			if (closeTime >= yearStart) {
				yearly += pnl;
				if (closeTime >= monthStart) {
					monthly += pnl;
					if (closeTime >= weekStart) {
						weekly += pnl;
						if (closeTime >= dayStart) daily += pnl;
					}
				}
			}
		});

		return { dailyPnl: daily, weeklyPnl: weekly, monthlyPnl: monthly, yearlyPnl: yearly };
	}, [trades, dayStart, weekStart, monthStart, yearStart]);

	const stats: Pages.Dashboard.StatGridData = {
		...DEFAULT_STATS,
		balanceDisplay: formatMoney(account?.balance ?? 0, moneyFormatter),
		tradesCount,
		monthlyPnl,
		weeklyPnl,
		yearlyPnl,
		dailyPnl,
		totalPnl,
		avgLoss,
		winRate,
		avgWin,
		losses,
		wins,
	};

	const rows = buildStatGridRows(stats, moneyFormatter);

	return (
		<div className="grid grid-cols-5 gap-2.5 max-[900px]:grid-cols-3 max-[600px]:grid-cols-2">
			{rows.map(({ label, value, color }) => (
				<div key={label} className="flex flex-col gap-1.5 rounded-[10px] border border-(--border) bg-(--bg1) px-3.5 py-4">
					<span className="text-[10px] uppercase tracking-[0.08em] text-(--text3)">{label}</span>
					<span className="[font-family:var(--font-display)] text-[20px] font-bold" style={{ color }}>
						{value}
					</span>
				</div>
			))}
		</div>
	);
}

export default StatGrid;
