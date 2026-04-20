import { useTradeTradesState } from "@/hooks";
import { useState, type JSX } from "react";
import TradeHistoryFilter from "./filter";
import TradeHeaders from "./headers";
import TradeItems from "./items";
import TradeCount from "./count";

const EMPTY_TRADES: Trade.PositionTrade[] = [];

function History(): JSX.Element {
	const trades = useTradeTradesState();
	const safeTrades = trades ?? EMPTY_TRADES;

	const [filteredTrades, setFilteredTrades] = useState<Trade.PositionTrade[]>(safeTrades);

	const isEmpty = !trades?.length;

	return (
		<div className="rounded-[14px] border border-(--border) bg-(--bg1) p-6">
			<TradeCount count={trades?.length ?? 0} />
			<TradeHistoryFilter trades={safeTrades} onChange={setFilteredTrades} />

			{isEmpty ? (
				<p style={{ color: "var(--text3)", textAlign: "center", padding: "2rem" }}>No trades yet</p>
			) : (
				<div style={{ overflowX: "auto" }}>
					<table className="w-full border-collapse">
						<TradeHeaders />
						<TradeItems trades={filteredTrades} />
					</table>
				</div>
			)}
		</div>
	);
}

export default History;
