import { LOG_CONFIG } from "@/configs";

declare global {
	namespace Pages.Log {
		type FormField = (typeof LOG_CONFIG.TRADE_FORM_FIELDS)[number];
		type FormKey = FormField["key"];

		type Filter = (typeof LOG_CONFIG.TRADE_FILTER_OPTIONS)[number]["value"];

		type Form = {
			[key in FormKey]?: string;
		};

		namespace Store {
			type State = {
				form?: Form;
			};

			type Actions = {
				addNotes: Callable.Sync.Argument<Form["notes"], void>;
				addEntry: Callable.Sync.Argument<Form["entry"], void>;
				addExit: Callable.Sync.Argument<Form["exit"], void>;
				addDate: Callable.Sync.Argument<Form["date"], void>;
				addSide: Callable.Sync.Argument<Form["side"], void>;
				addPnl: Callable.Sync.Argument<Form["pnl"], void>;
				addLot: Callable.Sync.Argument<Form["lot"], void>;
			};

			type Store = State & Actions;
		}

		namespace Props {
			type TradeHistoryFilter = {
				onChange: Callable.Sync.Argument<Trade.PositionTrade[], void>;
				trades: Trade.PositionTrade[];
			};
		}
	}
}

export {};
