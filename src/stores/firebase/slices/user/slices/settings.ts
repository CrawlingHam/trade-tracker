import type { StateCreator } from "zustand";
import {
	updateFirestoreUserCurrency,
	updateFirestoreUserSymbol,
	getFirestoreUserCurrency,
	updateFirestoreUserGoals,
	getFirestoreUserSymbol,
	getFirestoreUserGoals,
} from "@/libs";

const state: Firebase.Slice.User.Settings.State = {
	currency: undefined,
	symbol: undefined,
};

export const settingsSlice: StateCreator<Firebase.Store.Store, [], [], Firebase.Slice.User.Settings.Slice> = (set, get) => ({
	...state,

	setCurrency: async (currency: Firebase.Slice.User.Settings.State["currency"]): ReturnType<Firebase.Slice.User.Settings.Actions["setCurrency"]> => {
		const firestore = get().firestore;
		if (!firestore || !currency) return;

		await updateFirestoreUserCurrency(firestore, currency);
		set({ currency });
	},

	setSymbol: async (symbol: Firebase.Slice.User.Settings.State["symbol"]): ReturnType<Firebase.Slice.User.Settings.Actions["setSymbol"]> => {
		const firestore = get().firestore;
		if (!firestore || !symbol) return;

		await updateFirestoreUserSymbol(firestore, symbol);
		set({ symbol });
	},

	clearSettings: (): ReturnType<Firebase.Slice.User.Settings.Actions["clearSettings"]> =>
		set({
			currency: undefined,
			symbol: undefined,
		}),

	getCurrency: async (): ReturnType<Firebase.Slice.User.Settings.Actions["getCurrency"]> => {
		const firestore = get().firestore;
		if (!firestore) return;

		return await getFirestoreUserCurrency(firestore);
	},

	getSymbol: async (): ReturnType<Firebase.Slice.User.Settings.Actions["getSymbol"]> => {
		const firestore = get().firestore;
		if (!firestore) return;

		return await getFirestoreUserSymbol(firestore);
	},

	getGoals: async (): ReturnType<Firebase.Slice.User.Settings.Actions["getGoals"]> => {
		const firestore = get().firestore;
		if (!firestore) return;

		return await getFirestoreUserGoals(firestore);
	},

	setGoals: async (goals: Partial<Trade.Goals>): ReturnType<Firebase.Slice.User.Settings.Actions["setGoals"]> => {
		const firestore = get().firestore;
		if (!firestore) return;

		await updateFirestoreUserGoals(firestore, goals);
		set({ goals });
	},
});
