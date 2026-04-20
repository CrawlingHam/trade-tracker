const DIRECTION_OPTIONS = ["Long", "Short"] as const;

const TRADE_HEADERS = ["Date", "Side", "Entry Price", "Exit Price", "Lot", "P&L", "% bal", "Notes", ""] as const;

const TRADE_FORM_FIELDS = [
	{ label: "Date", key: "date", type: "date", placeholder: "Pick a date" },
	{ label: "Side", key: "side", type: "select", placeholder: "Pick a side" },
	{ label: "Lot size", key: "lot", type: "number", placeholder: "0.10", step: "0.01" },
	{ label: "Entry price", key: "entry", type: "number", placeholder: "4772.50" },
	{ label: "Exit price", key: "exit", type: "number", placeholder: "4780.00" },
	{ label: "P&L", key: "pnl", type: "number", placeholder: "+4.50 or -2.00", step: "0.01" },
	{ label: "Notes", key: "notes", type: "text", placeholder: "FVG entry, bearish retest..." },
] as const;

const TRADE_FILTER_OPTIONS = [
	{ label: "Latest", value: "latest" },
	{ label: "Oldest", value: "oldest" },
	{ label: "Biggest loss", value: "biggestLoss" },
	{ label: "Biggest profit", value: "biggestProfit" },
	{ label: "Long", value: "long" },
	{ label: "Short", value: "short" },
] as const;

export const LOG_CONFIG = {
	TRADE_FILTER_OPTIONS,
	TRADE_FORM_FIELDS,
	DIRECTION_OPTIONS,
	TRADE_HEADERS,
};
