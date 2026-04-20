import { tradeStore } from "@/stores";
import { useStore } from "zustand";

export const useTradeRemoveTrade = (): Trade.Store.Slices.User.Actions["removeTrade"] => useStore(tradeStore, (state) => state.removeTrade);
export const useTradeAddTrade = (): Trade.Store.Slices.User.Actions["addTrade"] => useStore(tradeStore, (state) => state.addTrade);

export const useTradeSetSelectedPairAction = (): Trade.Store.Slices.User.Actions["setSelectedPair"] => useStore(tradeStore, (state) => state.setSelectedPair);
