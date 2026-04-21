namespace Pages.Dashboard {
	type GoalEditorConfig = {
		setter: Callable.Argument<string, void>;
		value: string;
	};

	type ProgressMetrics = {
		monthlyProgress: number;
		yearlyProgress: number;
		weeklyProgress: number;
		monthlyPercent: number;
		dailyProgress: number;
		yearlyPercent: number;
		dailyPercent: number;
		weeklyPercent: number;
		monthTarget: number;
		yearTarget: number;
		weekTarget: number;
		dayTarget: number;
		dPnl: number;
		wPnl: number;
		mPnl: number;
		yPnl: number;
	};

	type GoalTargets = Pick<ProgressMetrics, "dayTarget" | "weekTarget" | "monthTarget" | "yearTarget">;

	type RingConfig = {
		label: Capitalize<Trade.GoalKey>;
		key: Trade.GoalKey;
		fontWeight: number;
		progress: number;
		fontSize: number;
		percent: number;
		stroke: string;
		color: string;
		size: number;
		pnl: number;
		sub: string;
	};

	type StatGridRow = {
		label: string;
		value: string;
		color: string;
	};

	type StatGridData = {
		balanceDisplay: string;
		winRate: number | null;
		tradesCount: number;
		monthlyPnl: number;
		weeklyPnl: number;
		yearlyPnl: number;
		totalPnl: number;
		dailyPnl: number;
		avgLoss: number;
		avgWin: number;
		losses: number;
		wins: number;
	};

	namespace Props {
		type MonthlySummary = {
			formatSignedMoney: Callable.Sync.Argument<number, string>;
			items: Trade.TaxBucket[];
		};

		type YearlySummary = MonthlySummary;

		type ExportTaxSummary = {
			formatSignedMoney: Callable.Sync.Argument<number, string>;
			monthly: Trade.TaxBucket[];
			yearly: Trade.TaxBucket[];
			currency: string;
		};

		type GoalEditor = GoalTargets & {
			safeGoals: Trade.Goals;
			goalKey: Trade.GoalKey;
		};

		type RingCenter = GoalEditor & Pick<RingConfig, "pnl" | "fontWeight" | "fontSize" | "percent" | "color">;
	}
}
