import { useFirebaseCurrencyState } from "../firebase";
import { useTradeAccountState } from "./states";
import { useMemo } from "react";

export function useTradeCurrency(): Intl.NumberFormat {
	const firebaseCurrency = useFirebaseCurrencyState();
	const account = useTradeAccountState();

	const currencyCode = firebaseCurrency ?? account?.currency ?? "EUR";

	return useMemo(
		() =>
			new Intl.NumberFormat(undefined, {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
				currency: currencyCode,
				style: "currency",
			}),
		[currencyCode]
	);
}
