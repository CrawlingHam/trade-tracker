import { useTradeAccountState, useTradeTradesState } from "@/hooks/trade";
import { getPositionPnl, toCurrencyString } from "@/utils";
import { type JSX } from "react";

type StatGridRow = { label: string; value: string; color: string };

type StatGridData = {
	balanceDisplay: string;
	winRate: number | null;
	tradesCount: number;
	totalPnl: number;
	wins: number;
	avgWin: number;
	losses: number;
	avgLoss: number;
};

const DEFAULT_STATS: StatGridData = {
	balanceDisplay: "$0.00",
	winRate: null,
	tradesCount: 0,
	totalPnl: 0,
	wins: 0,
	avgWin: 0,
	losses: 0,
	avgLoss: 0,
};

const buildStatGridRows = (p: StatGridData): StatGridRow[] => [
	{ label: "Balance", value: p.balanceDisplay, color: "var(--text)" },
	{ label: "Total P&L", value: toCurrencyString(p.totalPnl), color: p.totalPnl >= 0 ? "var(--green)" : "var(--red)" },
	{
		label: "Win rate",
		value: p.winRate !== null ? `${p.winRate}%` : "—",
		color: p.winRate !== null && p.winRate >= 50 ? "var(--green)" : "var(--amber)",
	},
	{ label: "Trades", value: String(p.tradesCount), color: "var(--text)" },
	{ label: "Avg win", value: p.wins ? `+$${p.avgWin.toFixed(2)}` : "—", color: "var(--green)" },
	{ label: "Avg loss", value: p.losses ? `-$${Math.abs(p.avgLoss).toFixed(2)}` : "—", color: "var(--red)" },
];

function StatGrid(): JSX.Element {
	const account = useTradeAccountState();
	const trades = useTradeTradesState();

	const tradePnls = trades?.map(getPositionPnl) ?? [];
	const tradesCount = tradePnls.length;
	const totalPnl = tradePnls.reduce((sum, pnl) => sum + pnl, 0);
	const wins = tradePnls.filter((pnl) => pnl > 0).length;
	const losses = tradePnls.filter((pnl) => pnl < 0).length;
	const winRate = tradesCount ? Math.round((wins / tradesCount) * 100) : null;
	const avgWin = wins ? tradePnls.filter((pnl) => pnl > 0).reduce((a, pnl) => a + pnl, 0) / wins : 0;
	const avgLoss = losses ? tradePnls.filter((pnl) => pnl < 0).reduce((a, pnl) => a + pnl, 0) / losses : 0;

	const stats: StatGridData = {
		...DEFAULT_STATS,
		balanceDisplay: `$${(account?.balance ?? 0).toFixed(2)}`,
		tradesCount,
		totalPnl,
		avgLoss,
		winRate,
		avgWin,
		losses,
		wins,
	};

	const rows = buildStatGridRows(stats);

	return (
		<div className="grid grid-cols-6 gap-2.5 max-[900px]:grid-cols-3 max-[600px]:grid-cols-2">
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
