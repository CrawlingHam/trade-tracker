import { useTradeCurrency, useTradeDailyPnlsState, useTradeMonthlyPnlsState, useTradeWeeklyPnlsState, useTradeYearlyPnlsState, useFirebaseGoalsState } from "@/hooks";
import { formatMoney, formatSignedMoney } from "@/utils";
import { DASHBOARD_CONFIG } from "@/configs";
import { Ring } from "@/components/shared";
import { useMemo, type JSX } from "react";
import { formatDate } from "date-fns";
import RingCenter from "./ring.center";

const { DEFAULT_PROGRESS_METRICS, DEFAULT_GOALS } = DASHBOARD_CONFIG;

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
	const monthlyPnls = useTradeMonthlyPnlsState();
	const weeklyPnls = useTradeWeeklyPnlsState();
	const yearlyPnls = useTradeYearlyPnlsState();
	const dailyPnls = useTradeDailyPnlsState();
	const moneyFormatter = useTradeCurrency();
	const goals = useFirebaseGoalsState();

	const safeGoals = goals ?? DEFAULT_GOALS;

	const { dayTarget, weekTarget, monthTarget, yearTarget } = useMemo<Pages.Dashboard.GoalTargets>(() => deriveGoalTargets(safeGoals), [safeGoals]);

	const now = new Date();

	const dayKey = formatDate(now, "yyyy-MM-dd");
	const weekKey = formatDate(now, "RRRR-'W'II");
	const monthKey = formatDate(now, "yyyy-MM");
	const yearKey = formatDate(now, "yyyy");

	const dPnl = dailyPnls[dayKey]?.pnl ?? 0;
	const wPnl = weeklyPnls[weekKey]?.pnl ?? 0;
	const mPnl = monthlyPnls[monthKey]?.pnl ?? 0;
	const yPnl = yearlyPnls[yearKey]?.pnl ?? 0;

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

	const getRingColor = (percent: number): string => {
		if (percent < 0) return "var(--red)";
		if (percent < 25) return "var(--amber)";
		if (percent < 50) return "var(--blue)";
		if (percent < 75) return "var(--teal)";
		return "var(--green)";
	};

	const ringConfigs: Pages.Dashboard.RingConfig[] = [
		{
			sub: `${formatSignedMoney(metrics.dPnl, moneyFormatter)} / ${formatMoney(metrics.dayTarget, moneyFormatter)}`,
			color: getRingColor(metrics.dailyPercent),
			progress: metrics.dailyProgress,
			percent: metrics.dailyPercent,
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
			color: getRingColor(metrics.weeklyPercent),
			progress: metrics.weeklyProgress,
			percent: metrics.weeklyPercent,
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
			color: getRingColor(metrics.monthlyPercent),
			progress: metrics.monthlyProgress,
			percent: metrics.monthlyPercent,
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
			color: getRingColor(metrics.yearlyPercent),
			progress: metrics.yearlyProgress,
			percent: metrics.yearlyPercent,
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
