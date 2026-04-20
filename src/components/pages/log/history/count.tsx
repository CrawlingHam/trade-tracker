import { type JSX } from "react";

const TradeCount = ({ count }: { count: number }): JSX.Element => (
	<p className="mb-4 [font-family:var(--font-display)] text-[11px] font-bold uppercase tracking-[0.12em] text-(--text3)">Trade history ({count})</p>
);

export default TradeCount;
