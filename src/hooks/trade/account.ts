import { useTradeAccountObject } from "./shallow";
import { useEffect } from "react";

export function useTradeAccount(initiate: boolean = true): Trade.Store.Slices.User.State["account"] {
	const { account, setAccount, model } = useTradeAccountObject();

	useEffect(() => {
		if (!initiate || account || !model) return;

		void (async () => {
			const account = await model.getAccount();
			if (!account) return;

			setAccount(account);
		})();
	}, [initiate, account, model, setAccount]);

	return account;
}
