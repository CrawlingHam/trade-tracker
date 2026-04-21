import { useFirebaseCurrencyState, useFirebaseGoalsState, useFirebaseSymbolState, useUserState } from "../../states";
import { useTradeSelectedPairObject } from "@/hooks/trade";
import { IS_PRODUCTION } from "@/configs";
import { useEffect, useRef } from "react";
import {
	useFirebaseClearSettingsAction,
	useFirebaseSetCurrencyAction,
	useFirebaseGetCurrencyAction,
	useFirebaseSetSymbolAction,
	useFirebaseGetSymbolAction,
	useFirebaseGetGoalsAction,
	useFirebaseSetGoalsAction,
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
	const getGoals = useFirebaseGetGoalsAction();
	const setGoals = useFirebaseSetGoalsAction();
	const goalsState = useFirebaseGoalsState();
	const user = useUserState();

	useEffect(() => {
		if (!start || !user) return;
		if (lastBootstrapUserRef.current === user.uid) return;
		lastBootstrapUserRef.current = user.uid;
		let cancelled = false;

		void (async () => {
			try {
				type TaskResult = { key: "currency"; value?: string } | { key: "symbol"; value?: Trade.Symbol } | { key: "goals"; value?: Trade.Goals };
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
					...(!goalsState
						? [
								getGoals()
									.then((value) => ({ key: "goals" as const, value }))
									.catch(() => ({ key: "goals" as const })),
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
				const goals = results.find((r) => r.key === "goals")?.value;

				if (cancelled) return;
				const hasCurrency = Boolean(currency);
				const hasSymbol = Boolean(symbol);
				const hasGoals = Boolean(goals && Object.keys(goals).length > 0);

				if (hasSymbol) {
					const s = symbol as Trade.Symbol;
					await setSymbol(s);
					const matchingPair = pairs?.pairs?.find((p) => p.symbol === s);
					setSelectedPair(matchingPair ?? { symbol: s, trade_count: 0, trade_percentage: 0 });
				}
				if (hasCurrency) await setCurrency(currency);
				if (hasGoals) await setGoals(goals as Partial<Trade.Goals>);

				if (!IS_PRODUCTION) {
					const msg =
						hasSymbol && hasCurrency && hasGoals
							? "Retrieved symbol, currency, and goals from user document."
							: hasSymbol && hasCurrency
							? "Retrieved symbol and currency from user document. Goals not found."
							: hasSymbol && hasGoals
							? "Retrieved symbol and goals from user document. Currency not found."
							: hasCurrency && hasGoals
							? "Retrieved currency and goals from user document. Symbol not found."
							: hasSymbol
							? "Retrieved symbol only from user document. Currency and goals not found."
							: hasCurrency
							? "Retrieved currency only from user document. Symbol and goals not found."
							: hasGoals
							? "Retrieved goals only from user document. Symbol and currency not found."
							: "No symbol, currency, or goals found in user document.";
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
	}, [currencyState, symbolState, goalsState, start, user, pairs, getGoals, setGoals, setSymbol, getSymbol, getCurrency, setCurrency, incrementStep, setSelectedPair]);

	useEffect(() => {
		if (!start || !user) lastBootstrapUserRef.current = null;
	}, [start, user]);

	useEffect(() => {
		return () => void clearSettings();
	}, [clearSettings]);
}
