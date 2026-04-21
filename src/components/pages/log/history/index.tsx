import { useTradeTradesObject } from "@/hooks";
import { Button } from "@/components/shared";
import { useState, type JSX } from "react";
import TradeHistoryFilter from "./filter";
import TradeHeaders from "./headers";
import TradeItems from "./items";
import TradeCount from "./count";

const EMPTY_TRADES: Trade.PositionTrade[] = [];

function History(): JSX.Element {
	const { trades, setTrades } = useTradeTradesObject();
	const safeTrades = trades ?? EMPTY_TRADES;

	const [filteredTrades, setFilteredTrades] = useState<Trade.PositionTrade[]>(safeTrades);

	const isEmpty = !trades?.length;
	const handleClearHistory = (): void => {
		setTrades([]);
		setFilteredTrades([]);
	};

	return (
		<div className="rounded-[14px] border border-(--border) bg-(--bg1) p-6">
			<div className="mb-3 flex items-center justify-between gap-3">
				<TradeCount count={trades?.length ?? 0} />
				<Button
					className="cursor-pointer rounded border border-(--border2) px-2 py-1 text-[11px] uppercase tracking-[0.06em] text-(--text3) hover:bg-(--bg3)"
					onClick={handleClearHistory}
					disabled={isEmpty}
					variant="ghost"
					type="button"
					size="sm"
				>
					Clear history
				</Button>
			</div>

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
