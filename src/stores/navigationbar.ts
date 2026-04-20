import { create } from "zustand";

const state: Navigationbar.Store.State = {
	tab: "Dashboard",
};

export const navigationbarStore = create<Navigationbar.Store.Store>((set) => ({
	...state,

	setTab: (tab: Navigationbar.Store.State["tab"]): ReturnType<Navigationbar.Store.Actions["setTab"]> => set({ tab }),
}));
