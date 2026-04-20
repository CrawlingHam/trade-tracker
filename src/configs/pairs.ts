import { DollarSign, Bitcoin, Coins, BarChart3, Globe } from "lucide-react";

const ICONS = {
	forex: DollarSign,
	crypto: Bitcoin,
	commodity: Coins,
	index: BarChart3,
	default: Globe,
} as const;

const SYMBOLS = [
	// 💱 FOREX
	{ symbol: "EURUSD", display: "EUR/USD", type: "forex" },
	{ symbol: "GBPUSD", display: "GBP/USD", type: "forex" },
	{ symbol: "USDJPY", display: "USD/JPY", type: "forex" },
	{ symbol: "USDCHF", display: "USD/CHF", type: "forex" },
	{ symbol: "AUDUSD", display: "AUD/USD", type: "forex" },
	{ symbol: "USDCAD", display: "USD/CAD", type: "forex" },
	{ symbol: "NZDUSD", display: "NZD/USD", type: "forex" },

	// 🪙 CRYPTO
	{ symbol: "BTCUSD", display: "BTC/USD", type: "crypto" },
	{ symbol: "ETHUSD", display: "ETH/USD", type: "crypto" },

	// 🪨 COMMODITIES
	{ symbol: "XAGUSD", display: "Silver/USD", type: "commodity" },
	{ symbol: "XAUUSD", display: "Gold/USD", type: "commodity" },
	{ symbol: "USOIL", display: "Oil", type: "commodity" },

	// 📈 INDICES
	{ symbol: "NAS100", display: "Nasdaq 100", type: "index" },
	{ symbol: "US30", display: "Dow Jones", type: "index" },
	{ symbol: "SPX500", display: "S&P 500", type: "index" },
	{ symbol: "GER40", display: "DAX 40", type: "index" },
] as const;

export const PAIRS = {
	SYMBOLS,
	ICONS,
} as const;
