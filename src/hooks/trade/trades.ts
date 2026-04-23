import { useTradeTradesObject } from "./shallow";
import { getDealNetPnl } from "@/utils";
import { formatDate } from "date-fns";
import { useEffect } from "react";

export function useTradeTrades(initiate: boolean = true): Trade.Store.Store["trades"] {
	const { trades, model, setTrades, setDailyPnls, setWeeklyPnls, setMonthlyPnls, setYearlyPnls } = useTradeTradesObject();

	useEffect(() => {
		if (!initiate || trades || !model) return;

		void (async () => {
			const trades = await model.getTrades();
			if (!trades) return;

			const monthlyPnlMap = new Map<string, Trade.Pnl>();
			const weeklyPnlMap = new Map<string, Trade.Pnl>();
			const yearlyPnlMap = new Map<string, Trade.Pnl>();
			const dailyPnlMap = new Map<string, Trade.Pnl>();

			const upsertPnl = (map: Map<string, Trade.Pnl>, key: string, closePnl: number, currency: string): void => {
				const current = map.get(key);
				const nextPnl = (current?.pnl ?? 0) + closePnl;

				map.set(key, {
					state: nextPnl > 0 ? "profit" : nextPnl < 0 ? "drawdown" : "break-even",
					currency: current?.currency ?? currency,
					pnl: Number(nextPnl.toFixed(2)),
				});
			};

			trades.forEach((trade) => {
				const currency = trade.currency ?? "USD";

				trade.closes.forEach((close) => {
					const closeTime = close.time_msc;
					if (typeof closeTime !== "number") return;

					const closeDate = new Date(closeTime);

					const dayKey = formatDate(closeDate, "yyyy-MM-dd");
					const weekKey = formatDate(closeDate, "RRRR-'W'II");
					const monthKey = formatDate(closeDate, "yyyy-MM");
					const yearKey = formatDate(closeDate, "yyyy");
					const closePnl = getDealNetPnl(close);

					upsertPnl(monthlyPnlMap, monthKey, closePnl, currency);
					upsertPnl(weeklyPnlMap, weekKey, closePnl, currency);
					upsertPnl(yearlyPnlMap, yearKey, closePnl, currency);
					upsertPnl(dailyPnlMap, dayKey, closePnl, currency);
				});
			});

			const monthlyPnl: Record<string, Trade.Pnl> = Object.fromEntries(monthlyPnlMap);
			const weeklyPnl: Record<string, Trade.Pnl> = Object.fromEntries(weeklyPnlMap);
			const yearlyPnl: Record<string, Trade.Pnl> = Object.fromEntries(yearlyPnlMap);
			const dailyPnl: Record<string, Trade.Pnl> = Object.fromEntries(dailyPnlMap);

			setTrades(trades);
			setDailyPnls(dailyPnl);
			setWeeklyPnls(weeklyPnl);
			setMonthlyPnls(monthlyPnl);
			setYearlyPnls(yearlyPnl);
		})();
	}, [initiate, trades, model, setTrades, setDailyPnls, setWeeklyPnls, setMonthlyPnls, setYearlyPnls]);

	return trades;
}
