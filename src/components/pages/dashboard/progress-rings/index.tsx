import { useTradeCurrency, useTradeTradesState, useFirebaseGoalsState } from "@/hooks";
import { formatMoney, formatSignedMoney, getPositionPnl } from "@/utils";
import { DASHBOARD_CONFIG } from "@/configs";
import { Ring } from "@/components/shared";
import { useMemo, type JSX } from "react";
import RingCenter from "./ring.center";

const { DEFAULT_PROGRESS_METRICS, DEFAULT_GOALS, DEFAULT_TRADES } = DASHBOARD_CONFIG;

function deriveGoalTargets(goals: Trade.Goals): Pages.Dashboard.GoalTargets {
	const monthly = goals.monthly && goals.monthly > 0 ? goals.monthly : undefined;
	const yearly = goals.yearly && goals.yearly > 0 ? goals.yearly : undefined;
	const weekly = goals.weekly && goals.weekly > 0 ? goals.weekly : undefined;
	const daily = goals.daily && goals.daily > 0 ? goals.daily : undefined;

	const yearTarget = yearly ?? (monthly ?? 0) * 12;
	const monthTarget = monthly ?? yearTarget / 12;
	const weekTarget = weekly ?? monthTarget / 4;
	const dayTarget = daily ?? weekTarget / 5;

	return { dayTarget, weekTarget, monthTarget, yearTarget };
}

function ProgressRings(): JSX.Element {
	const moneyFormatter = useTradeCurrency();
	const goals = useFirebaseGoalsState();
	const trades = useTradeTradesState();

	const safeGoals = goals ?? DEFAULT_GOALS;
	const safeTrades = trades ?? DEFAULT_TRADES;

	const { dayTarget, weekTarget, monthTarget, yearTarget } = useMemo<Pages.Dashboard.GoalTargets>(() => deriveGoalTargets(safeGoals), [safeGoals]);

	const now = new Date();

	const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
	const weekStart = new Date(dayStart - ((now.getDay() + 6) % 7) * 24 * 60 * 60 * 1000).getTime();
	const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
	const yearStart = new Date(now.getFullYear(), 0, 1).getTime();

	const { dPnl, wPnl, mPnl, yPnl } = useMemo(() => {
		let d = 0;
		let w = 0;
		let m = 0;
		let y = 0;

		safeTrades.forEach((trade) => {
			const closeTime = trade.closes[0]?.time_msc ?? 0;
			const pnl = getPositionPnl(trade);

			if (closeTime >= yearStart) {
				y += pnl;

				if (closeTime >= monthStart) {
					m += pnl;

					if (closeTime >= weekStart) {
						w += pnl;
						if (closeTime >= dayStart) d += pnl;
					}
				}
			}
		});

		return { dPnl: d, wPnl: w, mPnl: m, yPnl: y };
	}, [safeTrades, dayStart, weekStart, monthStart, yearStart]);

	const monthlyProgress = monthTarget > 0 ? mPnl / monthTarget : 0;
	const weeklyProgress = weekTarget > 0 ? wPnl / weekTarget : 0;
	const yearlyProgress = yearTarget > 0 ? yPnl / yearTarget : 0;
	const dailyProgress = dayTarget > 0 ? dPnl / dayTarget : 0;

	const monthlyPercent = monthTarget > 0 ? Math.round(monthlyProgress * 100) : 0;
	const weeklyPercent = weekTarget > 0 ? Math.round(weeklyProgress * 100) : 0;
	const yearlyPercent = yearTarget > 0 ? Math.round(yearlyProgress * 100) : 0;
	const dailyPercent = dayTarget > 0 ? Math.round(dailyProgress * 100) : 0;

	const metrics: Pages.Dashboard.ProgressMetrics = {
		...DEFAULT_PROGRESS_METRICS,
		monthlyProgress,
		weeklyProgress,
		monthlyPercent,
		yearlyProgress,
		weeklyPercent,
		yearlyPercent,
		dailyProgress,
		dailyPercent,
		monthTarget,
		weekTarget,
		yearTarget,
		dayTarget,
		dPnl,
		yPnl,
		wPnl,
		mPnl,
	};

	const ringConfigs: Pages.Dashboard.RingConfig[] = [
		{
			sub: `${formatSignedMoney(metrics.dPnl, moneyFormatter)} / ${formatMoney(metrics.dayTarget, moneyFormatter)}`,
			progress: metrics.dailyProgress,
			percent: metrics.dailyPercent,
			color: "var(--green)",
			pnl: metrics.dPnl,
			fontWeight: 600,
			label: "Daily",
			key: "daily",
			fontSize: 22,
			stroke: "12",
			size: 140,
		},
		{
			sub: `${formatSignedMoney(metrics.wPnl, moneyFormatter)} / ${formatMoney(metrics.weekTarget, moneyFormatter)}`,
			progress: metrics.weeklyProgress,
			percent: metrics.weeklyPercent,
			color: "var(--green)",
			pnl: metrics.wPnl,
			fontWeight: 600,
			label: "Weekly",
			key: "weekly",
			stroke: "12",
			fontSize: 22,
			size: 140,
		},
		{
			sub: `${formatSignedMoney(metrics.mPnl, moneyFormatter)} / ${formatMoney(metrics.monthTarget, moneyFormatter)}`,
			progress: metrics.monthlyProgress,
			percent: metrics.monthlyPercent,
			color: "var(--blue)",
			pnl: metrics.mPnl,
			label: "Monthly",
			fontWeight: 700,
			key: "monthly",
			fontSize: 28,
			stroke: "14",
			size: 170,
		},
		{
			sub: `${formatSignedMoney(metrics.yPnl, moneyFormatter)} / ${formatMoney(metrics.yearTarget, moneyFormatter)}`,
			progress: metrics.yearlyProgress,
			percent: metrics.yearlyPercent,
			color: "var(--blue)",
			pnl: metrics.yPnl,
			fontWeight: 700,
			label: "Yearly",
			key: "yearly",
			fontSize: 28,
			stroke: "14",
			size: 170,
		},
	];

	return (
		<div className="rounded-[14px] border border-(--border) bg-(--bg1) px-6 py-8">
			<div className="flex flex-wrap items-center justify-around gap-6">
				{ringConfigs.map(
					(ring: Pages.Dashboard.RingConfig): JSX.Element => (
						<Ring
							progress={ring.progress}
							stroke={ring.stroke}
							color={ring.color}
							label={ring.label}
							size={ring.size}
							key={ring.key}
							sub={ring.sub}
							center={
								<RingCenter
									fontWeight={ring.fontWeight}
									monthTarget={monthTarget}
									fontSize={ring.fontSize}
									yearTarget={yearTarget}
									weekTarget={weekTarget}
									percent={ring.percent}
									safeGoals={safeGoals}
									dayTarget={dayTarget}
									goalKey={ring.key}
									color={ring.color}
									pnl={ring.pnl}
								/>
							}
						/>
					)
				)}
			</div>
		</div>
	);
}

export default ProgressRings;
