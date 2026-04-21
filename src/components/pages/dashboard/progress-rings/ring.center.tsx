import GoalEditor from "./goal.editor";
import { type JSX } from "react";

function RingCenter({
	monthTarget,
	weekTarget,
	yearTarget,
	fontWeight,
	safeGoals,
	dayTarget,
	fontSize,
	goalKey,
	percent,
	color,
	pnl,
}: Pages.Dashboard.Props.RingCenter): JSX.Element {
	return (
		<>
			<span
				style={{
					color: pnl >= 0 ? color : "var(--red)",
					fontFamily: "var(--font-display)",
					fontWeight: fontWeight,
					fontSize: fontSize,
				}}
			>
				{percent}%
			</span>

			<GoalEditor monthTarget={monthTarget} yearTarget={yearTarget} weekTarget={weekTarget} safeGoals={safeGoals} dayTarget={dayTarget} goalKey={goalKey} />
		</>
	);
}

export default RingCenter;
