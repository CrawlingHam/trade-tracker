import type { TradeModel } from "@/models";
import type { PAIRS } from "@/configs";

declare global {
	namespace Trade {
		type SymbolsObject = (typeof PAIRS.SYMBOLS)[number];
		type Symbol = SymbolsObject["symbol"];

		type Goals = {
			currency?: string;
			monthly?: number;
			yearly?: number;
			weekly?: number;
			daily?: number;
		};

		type GoalKey = "daily" | "weekly" | "monthly" | "yearly";

		namespace Store {
			namespace Slices {
				namespace User {
					type State = {
						trades?: PositionTrade[];
						selectedPair?: Pair;
						pairs?: Pairs;
						account?: Trade.Account & {
							startingBalance: number;
						};
					};

					type Actions = {
						removeTrade: Callable.Sync.Argument<Trade.PositionTrade["position_id"], void>;
						setSelectedPair: Callable.Sync.Argument<State["selectedPair"], void>;
						addTrade: Callable.Sync.Argument<Trade.PositionTrade, void>;
						setAccount: Callable.Sync.Argument<State["account"], void>;
						setTrades: Callable.Sync.Argument<State["trades"], void>;
						setPairs: Callable.Sync.Argument<State["pairs"], void>;
					};

					type Slice = State & Actions;
				}

				type Slices = User.Slice;
			}

			type State = {
				model?: TradeModel;
				ready: boolean;
			};

			type Actions = {
				setReady: Callable.Sync.Argument<boolean, void>;
				initialize: Callable.Sync.Argument<void, void>;
			};

			type Store = State & Actions & Slices.Slices;
		}
	}
}

export {};
