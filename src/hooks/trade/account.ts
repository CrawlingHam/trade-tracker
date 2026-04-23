import { useTradeAccountObject } from "./shallow";
import { useTradeTradesState } from "./states";
import { getPositionNetPnl } from "@/utils";
import { useEffect } from "react";

export function useTradeAccount(initiate: boolean = true): Trade.Store.Slices.User.State["account"] {
	const { account, setAccount, model } = useTradeAccountObject();
	const trades = useTradeTradesState();

	useEffect(() => {
		if (!initiate || account || !model) return;

		void (async () => {
			const fetchedAccount = await model.getAccount();
			if (!fetchedAccount) return;

			setAccount({
				...fetchedAccount,
				startingBalance: fetchedAccount.balance,
			});
		})();
	}, [initiate, account, model, setAccount]);

	useEffect(() => {
		if (!initiate || !account) return;

		const totalRealizedPnl = (trades ?? []).reduce((sum, trade) => sum + getPositionNetPnl(trade), 0);
		const nextStartingBalance = Number((account.balance - totalRealizedPnl).toFixed(2));
		if (account.startingBalance === nextStartingBalance) return;

		setAccount({
			...account,
			startingBalance: nextStartingBalance,
		});
	}, [initiate, account, trades, setAccount]);

	return account;
}
