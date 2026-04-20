import { data as CURRENCY_DATA } from "currency-codes";
import { IoSunnyOutline } from "react-icons/io5";
import { ROUTES } from "./routes";
import { PAIRS } from "./pairs";

const CURRENCIES = CURRENCY_DATA.map(({ code, currency, digits }) => ({
	LABEL: currency,
	DIGITS: digits,
	CODE: code,
}));

export const NAVBAR_CONFIG = {
	CURRENCIES,
	PAIRS,
	TABS: [
		{
			ROUTE: ROUTES.APP.DASHBOARD.BASE.ROUTE,
			LABEL: "Dashboard",
		},
		{
			ROUTE: ROUTES.APP.LOG.BASE.ROUTE,
			LABEL: "Log",
		},
		{
			ROUTE: ROUTES.APP.PROJECTION.BASE.ROUTE,
			LABEL: "Projection",
		},
	],
	THEMES: [
		{
			ICON: IoSunnyOutline,
			LABEL: "Light",
			VALUE: "light",
		},
		{
			LABEL: "Dark",
			VALUE: "dark",
		},
		{
			LABEL: "System",
			VALUE: "system",
		},
	],
} as const;
