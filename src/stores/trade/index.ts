import { userSlice } from "./user.slice";
import { TradeModel } from "@/models";
import { create } from "zustand";

const initialState: Trade.Store.State = {
	model: undefined,
	ready: false,
};

export const tradeStore = create<Trade.Store.Store>((set, get, api) => ({
	...initialState,

	...userSlice(set, get, api),

	setReady: (ready: Trade.Store.State["ready"]): ReturnType<Trade.Store.Actions["setReady"]> => set({ ready }),

	initialize: (): ReturnType<Trade.Store.Actions["initialize"]> => {
		const tradeModel = get().model ?? new TradeModel();
		set({ model: tradeModel, ready: true });
	},
}));
