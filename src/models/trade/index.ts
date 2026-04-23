import { sendAxiosRequest } from "@/utils";
import { ROUTES } from "@/configs";

export class TradeModel implements Trade.Contract {
	private readonly endpoint = ROUTES.API.BASE.ROUTE;

	getAccount = async (): ReturnType<Trade.Contract["getAccount"]> => {
		return await sendAxiosRequest<Trade.Account>({
			config: {
				endpoint: new URL(`${this.endpoint}${ROUTES.API.ACCOUNT.BASE.ROUTE}`),
				method: "get",
			},
		});
	};

	getPairs = async (): ReturnType<Trade.Contract["getPairs"]> => {
		return await sendAxiosRequest<Trade.Pairs>({
			config: {
				endpoint: new URL(`${this.endpoint}${ROUTES.API.PAIRS.BASE.ROUTE}`),
				method: "get",
			},
		});
	};

	getTrades = async (): ReturnType<Trade.Contract["getTrades"]> => {
		return await sendAxiosRequest<Trade.PositionTrade[]>({
			config: {
				endpoint: new URL(`${this.endpoint}${ROUTES.API.TRADES.BASE.ROUTE}`),
				method: "get",
				options: {
					params: {
						dto: "true",
						orderBy: "desc",
					},
				},
			},
		});
	};
}
