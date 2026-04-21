import { useFirebaseCurrencyState, useFirebaseSymbolState, useTradeAccountState, useTradeRemoveTrade } from "@/hooks";
import { getTradeDirection, toCurrencyString } from "@/utils";
import { format } from "date-fns";
import { type JSX } from "react";

const TradeItems = ({ trades }: { trades: Trade.PositionTrade[] }): JSX.Element => {
	const firebaseCurrency = useFirebaseCurrencyState();
	const firebaseSymbol = useFirebaseSymbolState();
	const removeTrade = useTradeRemoveTrade();
	const account = useTradeAccountState();

	const handleRemoveTrade = (id: number): void => {
		removeTrade(id);
	};

	return (
		<tbody>
			{trades?.map(({ opens, closes, position_id, symbol, currency: tradeCurrency }): JSX.Element | null => {
				if (!opens.length && !closes.length) return null;

				const entry = opens[0];
				const exit = closes[0];

				const pair = symbol || entry?.symbol || exit?.symbol || firebaseSymbol || "EURUSD";
				const currency = tradeCurrency || account?.currency || firebaseCurrency || "EUR";

				const direction = getTradeDirection(entry);

				const lot = entry?.volume ?? exit?.volume ?? null;
				const pnl = exit?.profit ?? 0;
				const winningTrade = pnl > 0;

				const baselineBalance = account?.startingBalance ?? account?.balance ?? 0;
				const pct = baselineBalance > 0 ? ((pnl / baselineBalance) * 100).toFixed(2) : null;

				return (
					<tr key={position_id} className="border-b border-(--border) transition-colors hover:bg-(--bg3) last:border-b-0">
						<td className="px-2.5 py-2.5 text-xs">{format(new Date(entry?.time_msc ?? 0), "yyyy-MM-dd")}</td>
						<td>
							<span
								className={`rounded px-1.5 py-0.5 text-[10px] font-medium tracking-[0.04em] ${
									direction === "Long" ? "bg-(--green-dim) text-(--green)" : "bg-(--red-dim) text-(--red)"
								}`}
							>
								{direction}
							</span>
						</td>

						<td className="px-2.5 py-2.5 text-xs">{pair}</td>
						<td className="px-2.5 py-2.5 text-xs">{currency}</td>

						<td className="px-2.5 py-2.5 text-xs">{entry?.price?.toFixed(2) ?? "—"}</td>
						<td className="px-2.5 py-2.5 text-xs">{exit?.price?.toFixed(2) ?? "—"}</td>
						<td className="px-2.5 py-2.5 text-xs">{lot !== null ? lot.toFixed(2) : "—"}</td>
						<td className="px-2.5 py-2.5 text-xs font-medium" style={{ color: winningTrade ? "var(--green)" : "var(--red)" }}>
							{toCurrencyString(pnl)}
						</td>

						<td className="px-2.5 py-2.5 text-xs" style={{ color: winningTrade ? "var(--green)" : "var(--red)" }}>
							{pct !== null ? (
								<>
									{winningTrade ? "+" : ""}
									{pct}%
								</>
							) : (
								"—"
							)}
						</td>

						<td
							className="px-2.5 py-2.5 text-xs"
							style={{ color: "var(--text2)", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
						>
							{entry?.comment || "—"}
						</td>

						<td className="px-2.5 py-2.5 text-xs">
							<button
								className="cursor-pointer rounded px-1.5 py-0.5 text-[11px] text-(--text3) transition-all hover:bg-(--red-dim) hover:text-(--red)"
								onClick={() => handleRemoveTrade(position_id)}
							>
								✕
							</button>
						</td>
					</tr>
				);
			})}
		</tbody>
	);
};

export default TradeItems;
