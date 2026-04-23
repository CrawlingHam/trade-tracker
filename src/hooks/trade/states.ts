import { tradeStore } from "@/stores";
import { useStore } from "zustand";

export const useTradeAccountState = (): Trade.Store.Slices.User.State["account"] => useStore(tradeStore, (state) => state.account);

export const useTradePairsState = (): Trade.Store.Slices.User.State["pairs"] => useStore(tradeStore, (state) => state.pairs);

export const useTradeTradesState = (): Trade.Store.Slices.User.State["trades"] => useStore(tradeStore, (state) => state.trades);

export const useTradeSelectedPairState = (): Trade.Store.Slices.User.State["selectedPair"] => useStore(tradeStore, (state) => state.selectedPair);

export const useTradeDailyPnlsState = (): Trade.Store.Slices.User.State["dailyPnls"] => useStore(tradeStore, (state) => state.dailyPnls);
export const useTradeWeeklyPnlsState = (): Trade.Store.Slices.User.State["weeklyPnls"] => useStore(tradeStore, (state) => state.weeklyPnls);
export const useTradeMonthlyPnlsState = (): Trade.Store.Slices.User.State["monthlyPnls"] => useStore(tradeStore, (state) => state.monthlyPnls);
export const useTradeYearlyPnlsState = (): Trade.Store.Slices.User.State["yearlyPnls"] => useStore(tradeStore, (state) => state.yearlyPnls);
