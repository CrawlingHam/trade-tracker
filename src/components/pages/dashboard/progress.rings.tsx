import { useTradeAccountState, useTradeGoalsState, useTradeTradesState } from "@/hooks";
import { toCurrencyString, getPositionPnl } from "@/utils";
import { Ring } from "@/components/shared";
import { type JSX } from "react";

type ProgressMetrics = {
	weekTarget: number;
	monthTarget: number;
	maxRisk: number;
	wPnl: number;
	mPnl: number;
	weeklyProgress: number;
	monthlyProgress: number;
	weeklyPercent: number;
	monthlyPercent: number;
};

const DEFAULT_PROGRESS_METRICS: ProgressMetrics = {
	weekTarget: 0,
	monthTarget: 0,
	maxRisk: 0,
	wPnl: 0,
	mPnl: 0,
	weeklyProgress: 0,
	monthlyProgress: 0,
	weeklyPercent: 0,
	monthlyPercent: 0,
};

const DEFAULT_GOALS: Trade.Goals = {
	maxRiskPct: 0,
	currency: "USD",
	monthly: 0,
	weekly: 0,
};

const DEFAULT_TRADES: Trade.PositionTrade[] = [];

function ProgressRings(): JSX.Element {
	const account = useTradeAccountState();
	const trades = useTradeTradesState();
	const goals = useTradeGoalsState();

	const balance = account?.balance ?? 0;
	const safeGoals = goals ?? DEFAULT_GOALS;
	const safeTrades = trades ?? DEFAULT_TRADES;

	const weekTarget = balance * (safeGoals.weekly / 100);
	const monthTarget = balance * (safeGoals.monthly / 100);
	const maxRisk = balance * (safeGoals.maxRiskPct / 100);

	const pnls = safeTrades.map(getPositionPnl);
	const wPnl = pnls.reduce((acc, pnl) => acc + pnl, 0);
	const mPnl = pnls.reduce((acc, pnl) => acc + pnl, 0);
	const weeklyProgress = weekTarget > 0 ? wPnl / weekTarget : 0;
	const monthlyProgress = monthTarget > 0 ? mPnl / monthTarget : 0;
	const weeklyPercent = weekTarget > 0 ? Math.round(weeklyProgress * 100) : 0;
	const monthlyPercent = monthTarget > 0 ? Math.round(monthlyProgress * 100) : 0;

	const metrics: ProgressMetrics = {
		...DEFAULT_PROGRESS_METRICS,
		monthlyProgress,
		weeklyProgress,
		monthlyPercent,
		weeklyPercent,
		monthTarget,
		weekTarget,
		maxRisk,
		wPnl,
		mPnl,
	};

	return (
		<div className="flex flex-wrap items-center justify-around gap-6 rounded-[14px] border border-(--border) bg-(--bg1) px-6 py-8">
			<Ring
				sub={`${toCurrencyString(metrics.wPnl)} / $${metrics.weekTarget.toFixed(2)}`}
				progress={metrics.weeklyProgress}
				color="var(--green)"
				label="Weekly"
				stroke="12"
				size={140}
				center={
					<>
						<span style={{ fontSize: 22, fontWeight: 600, fontFamily: "var(--font-display)", color: metrics.wPnl >= 0 ? "var(--green)" : "var(--red)" }}>
							{metrics.weeklyPercent}%
						</span>
						<span style={{ fontSize: 10, color: "var(--text2)" }}>of goal</span>
					</>
				}
			/>

			<Ring
				sub={`${toCurrencyString(metrics.mPnl)} / $${metrics.monthTarget.toFixed(2)}`}
				progress={metrics.monthlyProgress}
				color="var(--blue)"
				label="Monthly"
				stroke="14"
				size={170}
				center={
					<>
						<span style={{ fontSize: 28, fontWeight: 700, fontFamily: "var(--font-display)", color: metrics.mPnl >= 0 ? "var(--blue)" : "var(--red)" }}>
							{metrics.monthlyPercent}%
						</span>

						<span style={{ fontSize: 10, color: "var(--text2)" }}>of goal</span>
					</>
				}
			/>

			<Ring
				sub={`${safeGoals.maxRiskPct}% of $${balance.toFixed(2)}`}
				progress={Math.min(safeGoals.maxRiskPct / 5, 1)}
				label="Risk / trade"
				color="var(--red)"
				stroke="12"
				size={140}
				center={
					<>
						<span style={{ fontSize: 20, fontWeight: 600, fontFamily: "var(--font-display)", color: "var(--red)" }}>${metrics.maxRisk.toFixed(2)}</span>
						<span style={{ fontSize: 10, color: "var(--text2)" }}>max loss</span>
					</>
				}
			/>
		</div>
	);
}

export default ProgressRings;
