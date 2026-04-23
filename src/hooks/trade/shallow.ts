import { useShallow } from "zustand/react/shallow";
import { tradeStore } from "@/stores";
import { useStore } from "zustand";

export function useTradeInitialization(): Pick<Trade.Store.Store, "initialize" | "ready"> {
	return useStore(
		tradeStore,
		useShallow((s) => ({
			initialize: s.initialize,
			ready: s.ready,
		}))
	);
}

export function useTradeAccountObject(): Pick<Trade.Store.Store, "account" | "setAccount" | "model"> {
	return useStore(
		tradeStore,
		useShallow((s) => ({
			setAccount: s.setAccount,
			account: s.account,
			model: s.model,
		}))
	);
}

export function useTradePairsObject(): Pick<Trade.Store.Store, "pairs" | "selectedPair" | "setSelectedPair" | "setPairs" | "model"> {
	return useStore(
		tradeStore,
		useShallow((s) => ({
			setSelectedPair: s.setSelectedPair,
			selectedPair: s.selectedPair,
			setPairs: s.setPairs,
			pairs: s.pairs,
			model: s.model,
		}))
	);
}

export function useTradeTradesObject(): Pick<
	Trade.Store.Store,
	"trades" | "setTrades" | "model" | "dailyPnls" | "weeklyPnls" | "monthlyPnls" | "yearlyPnls" | "setDailyPnls" | "setWeeklyPnls" | "setMonthlyPnls" | "setYearlyPnls"
> {
	return useStore(
		tradeStore,
		useShallow((s) => ({
			setTrades: s.setTrades,
			setDailyPnls: s.setDailyPnls,
			setWeeklyPnls: s.setWeeklyPnls,
			setMonthlyPnls: s.setMonthlyPnls,
			setYearlyPnls: s.setYearlyPnls,
			trades: s.trades,
			model: s.model,
			dailyPnls: s.dailyPnls,
			weeklyPnls: s.weeklyPnls,
			monthlyPnls: s.monthlyPnls,
			yearlyPnls: s.yearlyPnls,
		}))
	);
}

export function useTradeSelectedPairObject(): Pick<Trade.Store.Store, "selectedPair" | "pairs" | "setSelectedPair"> {
	return useStore(
		tradeStore,
		useShallow((s) => ({
			setSelectedPair: s.setSelectedPair,
			selectedPair: s.selectedPair,
			pairs: s.pairs,
		}))
	);
}
