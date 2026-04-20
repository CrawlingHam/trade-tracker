import { useTradeTradesObject } from "./shallow";
import { useEffect } from "react";

export function useTradeTrades(initiate: boolean = true): Trade.Store.Store["trades"] {
	const { trades, model, setTrades } = useTradeTradesObject();

	useEffect(() => {
		if (!initiate || trades || !model) return;

		void (async () => {
			const trades = await model.getTrades();
			if (!trades) return;

			setTrades(trades);
		})();
	}, [initiate, trades, model, setTrades]);

	return trades;
}
