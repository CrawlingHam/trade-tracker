import ProgressRings from "./progress.rings";
import StatGrid from "./stat.grid";
import { type JSX } from "react";

function Dashboard(): JSX.Element {
	return (
		<div className="flex w-full flex-col gap-5">
			<ProgressRings />
			<StatGrid />
			{/* <BalanceChart /> */}
			{/* <RecentPnl /> */}
		</div>
	);
}

export default Dashboard;
