import { NAVBAR_CONFIG } from "@/configs";

declare global {
	namespace Navigationbar {
		type Currencies = (typeof NAVBAR_CONFIG.CURRENCIES)[number];

		type CurrencyCode = Currencies["CODE"];
		type CurrencyLabel = Currencies["LABEL"];
		type CurrencyDigits = Currencies["DIGITS"];

		type Tabs = (typeof NAVBAR_CONFIG.TABS)[number];
		type TabLabel = Tabs["LABEL"];
		type TabRoute = Tabs["ROUTE"];

		namespace Store {
			type State = {
				tab: TabLabel;
			};

			type Actions = {
				setTab: Callable.Sync.Argument<State["tab"], void>;
			};

			type Store = State & Actions;
		}
	}
}

export {};
