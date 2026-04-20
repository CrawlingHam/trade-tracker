import { useEffect, useMemo, useState, type JSX } from "react";
import { getSide, getTime, getPnl } from "@/utils";
import { LOG_CONFIG } from "@/configs";

function applyTradeFilter(trades: Trade.PositionTrade[], filter: Pages.Log.Filter): Trade.PositionTrade[] {
	const list = [...trades];

	if (filter === "long") return list.filter((trade) => getSide(trade) === "Long");
	if (filter === "short") return list.filter((trade) => getSide(trade) === "Short");
	if (filter === "oldest") return list.sort((a, b) => getTime(a) - getTime(b));
	if (filter === "biggestLoss") return list.sort((a, b) => getPnl(a) - getPnl(b));
	if (filter === "biggestProfit") return list.sort((a, b) => getPnl(b) - getPnl(a));

	return list.sort((a, b) => getTime(b) - getTime(a));
}

function TradeHistoryFilter({ trades, onChange }: Pages.Log.Props.TradeHistoryFilter): JSX.Element {
	const [filter, setFilter] = useState<Pages.Log.Filter>("latest");
	const filteredTrades = useMemo<Trade.PositionTrade[]>(() => applyTradeFilter(trades, filter), [trades, filter]);

	useEffect(() => {
		onChange(filteredTrades);
	}, [filteredTrades, onChange]);

	return (
		<div className="mb-4 flex flex-wrap gap-2">
			{LOG_CONFIG.TRADE_FILTER_OPTIONS.map(
				({ label, value }): JSX.Element => (
					<button
						onClick={() => setFilter(value)}
						type="button"
						key={value}
						className={`cursor-pointer rounded-md border px-2.5 py-1 text-[11px] uppercase tracking-[0.06em] transition-colors ${
							filter === value
								? "border-(--green-dim) bg-(--green-dim2) text-(--green)"
								: "border-(--border2) text-(--text2) hover:bg-(--bg3) hover:text-(--text)"
						}`}
					>
						{label}
					</button>
				)
			)}
		</div>
	);
}

export default TradeHistoryFilter;
