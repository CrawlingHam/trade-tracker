import { useThemeInitialization } from "./shallow";
import { useLayoutEffect } from "react";

/**
 * App-level theme hook.
 * Updates the app store state setThemeReady with the latest ready state.
 */
export function useThemeBootstrap(): Theme.Store.Store["ready"] {
	const { ready, initialize } = useThemeInitialization();

	useLayoutEffect(() => {
		initialize();
	}, [initialize]);

	return ready;
}
