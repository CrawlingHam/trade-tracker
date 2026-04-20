import { useTradePairsObject } from "./shallow";
import { useEffect } from "react";

export function useTradePairs(initiate: boolean = true): Trade.Store.Slices.User.State["pairs"] {
	const { pairs, selectedPair, model, setPairs, setSelectedPair } = useTradePairsObject();

	useEffect(() => {
		if (!initiate || pairs || !model) return;

		void (async () => {
			const pairs = await model.getPairs();
			if (!pairs) return;

			setPairs(pairs);

			if (!selectedPair) setSelectedPair(pairs.pairs[0]);
		})();
	}, [initiate, pairs, selectedPair, model, setPairs, setSelectedPair]);

	return pairs;
}
