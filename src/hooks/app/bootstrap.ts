import { useFirebaseBootstrap } from "../firebase";
import { useThemeBootstrap } from "@/hooks/theme";
import { useAppSetReadyAction } from "./actions";
import { useTradeBootstrap } from "../trade";
import { useEffect } from "react";

/**
 * Calls bootstraps in order.
 *
 * App is ready when all bootstraps are complete
 */
export function useAppBootstrap(): void {
	const setReady = useAppSetReadyAction();

	const themeReady = useThemeBootstrap();
	const firebaseReady = useFirebaseBootstrap(themeReady);
	const tradeReady = useTradeBootstrap(firebaseReady);

	const ready = themeReady && firebaseReady && tradeReady;

	useEffect(() => {
		setReady(ready);
	}, [setReady, ready]);
}
