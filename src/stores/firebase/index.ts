import { getFirebaseClientCredentials, initializeFirebaseServices } from "@/libs/";
import { userSlice } from "./slices";
import { create } from "zustand";

const state: Firebase.Store.State = {
	ready: false,
};

export const firebaseStore = create<Firebase.Store.Store>((set, get, api) => ({
	...state,

	...userSlice(set, get, api),

	setReady: (ready: Firebase.Store.State["ready"]): ReturnType<Firebase.Store.Actions["setReady"]> => set({ ready }),

	initialize: (): ReturnType<Firebase.Store.Actions["initialize"]> => {
		const credentials = getFirebaseClientCredentials();
		const services = initializeFirebaseServices(credentials);

		set({
			firestore: services.firestore,
			client: services.client,
			ready: false,
		});
	},

	clearAll: (): ReturnType<Firebase.Store.Actions["clearAll"]> => {
		const { clearUser, clearClient } = get();

		clearUser();
		clearClient();
		set({ ready: false });
	},
}));
