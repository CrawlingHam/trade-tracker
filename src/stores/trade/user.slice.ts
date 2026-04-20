import type { StateCreator } from "zustand";

const state: Trade.Store.Slices.User.State = {
	selectedPair: undefined,
	account: undefined,
	pairs: undefined,
	goals: undefined,
};

export const userSlice: StateCreator<Trade.Store.Store, [], [], Trade.Store.Slices.User.Slice> = (set) => ({
	...state,

	setSelectedPair: (selectedPair: Trade.Store.Slices.User.State["selectedPair"]): ReturnType<Trade.Store.Slices.User.Actions["setSelectedPair"]> =>
		set({ selectedPair }),
	setAccount: (account: Trade.Store.Slices.User.State["account"]): ReturnType<Trade.Store.Slices.User.Actions["setAccount"]> => set({ account }),
	setTrades: (trades: Trade.Store.Slices.User.State["trades"]): ReturnType<Trade.Store.Slices.User.Actions["setTrades"]> => set({ trades }),
	setPairs: (pairs: Trade.Store.Slices.User.State["pairs"]): ReturnType<Trade.Store.Slices.User.Actions["setPairs"]> => set({ pairs }),

	removeTrade: (position_id: Trade.PositionTrade["position_id"]): ReturnType<Trade.Store.Slices.User.Actions["removeTrade"]> =>
		set((state) => ({ trades: state.trades?.filter((trade) => trade.position_id !== position_id) })),

	setGoals: (goals: Trade.Store.Slices.User.State["goals"]): ReturnType<Trade.Store.Slices.User.Actions["setGoals"]> => set({ goals }),

	addTrade: (trade: Trade.PositionTrade): ReturnType<Trade.Store.Slices.User.Actions["addTrade"]> =>
		set((state) => ({
			trades: [...(state.trades ?? []), trade],
		})),
});
