import type { TradeModel } from "@/models";
import type { PAIRS } from "@/configs";

declare global {
	namespace Trade {
		type SymbolsObject = (typeof PAIRS.SYMBOLS)[number];
		type Symbol = SymbolsObject["symbol"];

		type Goals = {
			maxRiskPct: number;
			currency: string;
			monthly: number;
			weekly: number;
		};

		namespace Store {
			namespace Slices {
				namespace User {
					type State = {
						trades?: PositionTrade[];
						account?: Trade.Account;
						selectedPair?: Pair;
						goals?: Goals;
						pairs?: Pairs;
					};

					type Actions = {
						removeTrade: Callable.Sync.Argument<Trade.PositionTrade["position_id"], void>;
						setSelectedPair: Callable.Sync.Argument<State["selectedPair"], void>;
						addTrade: Callable.Sync.Argument<Trade.PositionTrade, void>;
						setAccount: Callable.Sync.Argument<State["account"], void>;
						setTrades: Callable.Sync.Argument<State["trades"], void>;
						setGoals: Callable.Sync.Argument<State["goals"], void>;
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
