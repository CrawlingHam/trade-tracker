import { tradeStore } from "@/stores";
import { useStore } from "zustand";

export const useTradeAccountState = (): Trade.Store.Slices.User.State["account"] => useStore(tradeStore, (state) => state.account);

export const useTradePairsState = (): Trade.Store.Slices.User.State["pairs"] => useStore(tradeStore, (state) => state.pairs);

export const useTradeTradesState = (): Trade.Store.Slices.User.State["trades"] => useStore(tradeStore, (state) => state.trades);

export const useTradeGoalsState = (): Trade.Store.Slices.User.State["goals"] => useStore(tradeStore, (state) => state.goals);

export const useTradeSelectedPairState = (): Trade.Store.Slices.User.State["selectedPair"] => useStore(tradeStore, (state) => state.selectedPair);
