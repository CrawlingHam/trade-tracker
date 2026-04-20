import { CREATE_ANONYMOUS_USERS, IS_PRODUCTION } from "@/configs";
import type { Unsubscribe, User } from "firebase/auth";
import { useFirebaseClientState } from "../../states";
import { useEffect, useRef } from "react";
import {
	useFirebaseCreateAnonymousUserAction,
	useFirebaseInitializeAuthAction,
	useFirebaseSetIsAnonymousAction,
	useFirebaseClearUserAction,
	useFirebaseSetClientAction,
	useFirebaseSubscribeAction,
	useFirebaseSetUserAction,
} from "../../actions";

const LOG_PREFIX = "[HOOKS::USER_SUBSCRIBER]" as const;

export function useUserSubscriber(start: boolean = false, incrementStep: Callable.Sync.Void): void {
	const createAnonymousUser = useFirebaseCreateAnonymousUserAction();
	const setIsAnonymous = useFirebaseSetIsAnonymousAction();
	const initializeAuth = useFirebaseInitializeAuthAction();
	const unsubRef = useRef<Unsubscribe | null>(null);
	const setClient = useFirebaseSetClientAction();
	const clearUser = useFirebaseClearUserAction();
	const subscribe = useFirebaseSubscribeAction();
	const setUser = useFirebaseSetUserAction();
	const clientApp = useFirebaseClientState();

	useEffect(() => {
		if (!start || !clientApp) return;

		setClient(clientApp);

		void ((): void => {
			initializeAuth();

			unsubRef.current = subscribe(async (user: User | null): Promise<void> => {
				const isAnonymousUser = Boolean(user && user.isAnonymous);

				if (!IS_PRODUCTION) console.info(`${LOG_PREFIX} ${!isAnonymousUser ? "Authenticated" : "Anonymous"} User Detected`);

				setUser(user);
				setIsAnonymous(isAnonymousUser);

				if (!user) {
					clearUser();

					if (CREATE_ANONYMOUS_USERS) {
						await createAnonymousUser();
					}
				}

				incrementStep();
			});
		})();

		return () => {
			unsubRef.current?.();
			unsubRef.current = null;
		};
	}, [start, setUser, clientApp, subscribe, setClient, clearUser, incrementStep, setIsAnonymous, initializeAuth, createAnonymousUser]);
}
