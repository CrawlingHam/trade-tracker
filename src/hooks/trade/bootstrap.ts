import { useTradeInitialization } from "./shallow";
import { useTradeAccount } from "./account";
import { useTradeTrades } from "./trades";
import { useTradePairs } from "./pairs";
import { useEffect } from "react";

export function useTradeBootstrap(bootstrap: boolean = false): Trade.Store.Store["ready"] {
	const { ready, initialize } = useTradeInitialization();

	useEffect(() => {
		if (!bootstrap) return;
		initialize();
	}, [bootstrap, initialize]);

	useTradeTrades(ready);
	useTradeAccount(ready);
	useTradePairs(ready);

	return ready;
}
