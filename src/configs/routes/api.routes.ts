export const API_ROUTES = {
	ALL: {
		BASE: {
			TITLE: "All",
			ROUTE: "/all",
		},
	},
	TRADES: {
		BASE: {
			TITLE: "Trades",
			ROUTE: "/trades",
		},
	},
	PAIRS: {
		BASE: {
			TITLE: "Pairs",
			ROUTE: "/pairs",
		},
	},
	POSITIONS: {
		BASE: {
			TITLE: "Positions",
			ROUTE: "/positions",
		},
	},
	ACCOUNT: {
		BASE: {
			TITLE: "Account",
			ROUTE: "/account",
		},
	},
	BASE: {
		TITLE: "Base",
		ROUTE: import.meta.env.VITE_API_URL as string,
	},
} as const;
