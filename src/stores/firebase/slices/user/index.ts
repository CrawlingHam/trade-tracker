import { clientSlice, settingsSlice } from "./slices";
import { signInAnonymously } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import type { StateCreator } from "zustand";
import { IS_PRODUCTION } from "@/configs";

const LOG_PREFIX = "[STORES::USER::USER_SLICE::CREATE_ANONYMOUS_USER]" as const;

const state: Firebase.Slice.User.State = {
	isAnonymous: false,
	user: null,
};

export const userSlice: StateCreator<Firebase.Store.Store, [], [], Firebase.Slice.User.Slice> = (set, get, api) => ({
	...state,

	...settingsSlice(set, get, api),
	...clientSlice(set, get, api),

	setIsAnonymous: (isAnonymous: Firebase.Slice.User.State["isAnonymous"]): ReturnType<Firebase.Slice.User.Actions["setIsAnonymous"]> => set({ isAnonymous }),
	setUser: (user: Firebase.Slice.User.State["user"]): ReturnType<Firebase.Slice.User.Actions["setUser"]> => set({ user }),
	createAnonymousUser: async (): ReturnType<Firebase.Slice.User.Actions["createAnonymousUser"]> => {
		const auth = get().auth;

		try {
			if (!auth) throw new Error("Auth not found");
			await signInAnonymously(auth);

			if (!IS_PRODUCTION) console.info(`${LOG_PREFIX} Anonymous user created`);
		} catch (error: unknown) {
			if (error instanceof FirebaseError && error.code === "auth/admin-restricted-operation") {
				if (!IS_PRODUCTION) console.warn(`${LOG_PREFIX} Anonymous auth is disabled. User will remain unauthenticated.`);
			} else if (!IS_PRODUCTION) console.warn(`${LOG_PREFIX} Anonymous sign-in failed:`, error);
		}
	},

	clearUser: (): ReturnType<Firebase.Slice.User.Actions["clearUser"]> =>
		set({
			isAnonymous: true,
			user: null,
		}),
});
