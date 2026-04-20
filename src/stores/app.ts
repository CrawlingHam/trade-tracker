import { create } from "zustand";

const state: App.Store.State = {
	ready: false,
};

export const appStore = create<App.Store.Store>((set) => ({
	...state,

	setReady: (ready: boolean): ReturnType<App.Store.Actions["setReady"]> => set({ ready }),
}));
