import { useFirebaseClearAllState, useFirebaseClientState, useFirebaseReadyState } from "../states";
import { useFirebaseInitializeAction, useFirebaseSetReadyAction } from "../actions";
import { useUserBootstrap } from "./user";
import { useEffect } from "react";

/**
 * App-level firebase hook
 * @param start - When to start the firebase bootstrap.
 */
export function useFirebaseBootstrap(start: boolean = false): Firebase.Store.Store["ready"] {
	const initialize = useFirebaseInitializeAction();
	const setReady = useFirebaseSetReadyAction();
	const clearAll = useFirebaseClearAllState();
	const client = useFirebaseClientState();
	const ready = useFirebaseReadyState();

	const userReady = useUserBootstrap(!!client);

	useEffect(() => {
		if (!start) return;
		initialize();
	}, [start, initialize]);

	useEffect(() => {
		setReady(start && userReady);
	}, [start, userReady, setReady]);

	useEffect(() => {
		return (): void => void clearAll();
	}, [clearAll]);

	return ready;
}
