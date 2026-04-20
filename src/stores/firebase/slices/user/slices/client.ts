import { getAuth, onAuthStateChanged } from "firebase/auth";
import type { StateCreator } from "zustand";

const state: Firebase.Slice.User.Client.State = {
	firestore: undefined,
	client: undefined,
	auth: undefined,
};

export const clientSlice: StateCreator<Firebase.Store.Store, [], [], Firebase.Slice.User.Client.Slice> = (set, get) => ({
	...state,

	subscribe: <T>(callback: (user: Firebase.Slice.User.State["user"]) => Promise<T>): ReturnType<Firebase.Slice.User.Client.Actions["subscribe"]> => {
		const auth = get().auth ?? get().initializeAuth();
		if (!auth) throw new Error("Auth not found");

		return onAuthStateChanged(auth, (user: Firebase.Slice.User.State["user"]): void => {
			void callback(user).catch(() => {});
		});
	},

	setFirestore: (firestore: Firebase.Slice.User.Client.State["firestore"]): ReturnType<Firebase.Slice.User.Client.Actions["setFirestore"]> => {
		set({ firestore });
	},

	setClient: (client: Firebase.Slice.User.Client.State["client"]): ReturnType<Firebase.Slice.User.Client.Actions["setClient"]> => {
		set({ client });
	},

	initializeAuth: (): ReturnType<Firebase.Slice.User.Client.Actions["initializeAuth"]> => {
		const clientApp = get().client;
		if (!clientApp) throw new Error("Client app not found");
		set({ auth: getAuth(clientApp) });
	},

	clearClient: (): ReturnType<Firebase.Slice.User.Client.Actions["clearClient"]> => {
		set({
			firestore: undefined,
			client: undefined,
			auth: undefined,
		});
	},
});
