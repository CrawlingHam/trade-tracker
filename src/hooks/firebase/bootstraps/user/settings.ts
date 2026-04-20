import { useFirebaseCurrencyState, useFirebaseSymbolState, useUserState } from "../../states";
import { useTradeSelectedPairObject } from "@/hooks/trade";
import { IS_PRODUCTION } from "@/configs";
import { useEffect, useRef } from "react";
import {
	useFirebaseClearSettingsAction,
	useFirebaseSetCurrencyAction,
	useFirebaseGetCurrencyAction,
	useFirebaseSetSymbolAction,
	useFirebaseGetSymbolAction,
} from "../../actions";

export function useUserSettings(start: boolean = false, incrementStep: Callable.Sync.Void): void {
	const { pairs, setSelectedPair } = useTradeSelectedPairObject();
	const lastBootstrapUserRef = useRef<string | null>(null);
	const clearSettings = useFirebaseClearSettingsAction();
	const setCurrency = useFirebaseSetCurrencyAction();
	const getCurrency = useFirebaseGetCurrencyAction();
	const currencyState = useFirebaseCurrencyState();
	const setSymbol = useFirebaseSetSymbolAction();
	const getSymbol = useFirebaseGetSymbolAction();
	const symbolState = useFirebaseSymbolState();
	const user = useUserState();

	useEffect(() => {
		if (!start || !user) return;
		if (lastBootstrapUserRef.current === user.uid) return;
		lastBootstrapUserRef.current = user.uid;
		let cancelled = false;

		void (async () => {
			try {
				type TaskResult = { key: "currency"; value?: string } | { key: "symbol"; value?: Trade.Symbol };
				const tasks: Promise<TaskResult>[] = [
					...(!currencyState
						? [
								getCurrency()
									.then((value) => ({ key: "currency" as const, value }))
									.catch(() => ({ key: "currency" as const })),
						  ]
						: []),
					...(!symbolState
						? [
								getSymbol()
									.then((value) => ({ key: "symbol" as const, value }))
									.catch(() => ({ key: "symbol" as const })),
						  ]
						: []),
				];
				if (tasks.length === 0) {
					if (!IS_PRODUCTION) console.log("[HOOKS::USER_SETTINGS] No settings fetch tasks to complete.");
					incrementStep();
					return;
				}

				const results = await Promise.all(tasks);
				const currency = results.find((r) => r.key === "currency")?.value;
				const symbol = results.find((r) => r.key === "symbol")?.value;

				if (cancelled) return;
				const hasCurrency = Boolean(currency);
				const hasSymbol = Boolean(symbol);

				if (hasSymbol) {
					const s = symbol as Trade.Symbol;
					await setSymbol(s);
					const matchingPair = pairs?.pairs?.find((p) => p.symbol === s);
					setSelectedPair(matchingPair ?? { symbol: s, trade_count: 0, trade_percentage: 0 });
				}
				if (hasCurrency) await setCurrency(currency);

				if (!IS_PRODUCTION) {
					const msg =
						hasSymbol && hasCurrency
							? "Retrieved symbol and currency from user document."
							: hasSymbol
							? "Retrieved symbol only from user document. Currency not found."
							: hasCurrency
							? "Retrieved currency only from user document. Symbol not found."
							: "No symbol or currency found in user document.";
					console.log(`[HOOKS::USER_SETTINGS] ${msg}`);
				}
				incrementStep();
			} catch (error) {
				if (cancelled) return;
				if (!IS_PRODUCTION) console.error("Failed to bootstrap user settings", error);
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [start, user, pairs, currencyState, symbolState, getCurrency, getSymbol, setCurrency, setSymbol, incrementStep, setSelectedPair]);

	useEffect(() => {
		if (!start || !user) lastBootstrapUserRef.current = null;
	}, [start, user]);

	useEffect(() => {
		return () => void clearSettings();
	}, [clearSettings]);
}
