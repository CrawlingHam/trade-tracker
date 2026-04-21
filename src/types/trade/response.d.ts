namespace Trade {
	type Terminal = {
		notifications_enabled: boolean;
		community_connection: boolean;
		community_balance: number;
		community_account: boolean;
		tradeapi_disabled: boolean;
		retransmission: number;
		commondata_path: string;
		email_enabled: boolean;
		trade_allowed: boolean;
		dlls_allowed: boolean;
		ftp_enabled: boolean;
		connected: boolean;
		data_path: string;
		ping_last: number;
		codepage: number;
		language: string;
		company: string;
		maxbars: number;
		build: number;
		mqid: boolean;
		name: string;
		path: string;
	};

	type Health = {
		terminal: Terminal;
		connected: boolean;
	};

	type Account = {
		margin_manumberenance: number;
		commission_blocked: number;
		margin_initial: number;
		margin_so_call: number;
		currency_digits: number;
		margin_so_so: number;
		margin_level: number;
		margin_so_mode: number;
		trade_allowed: boolean;
		margin_free: number;
		liabilities: number;
		trade_expert: boolean;
		limit_orders: number;
		fifo_close: boolean;
		margin_mode: number;
		trade_mode: number;
		balance: number;
		assets: number;
		credit: number;
		currency: string;
		equity: number;
		leverage: number;
		margin: number;
		profit: number;
		company: string;
		server: string;
		login: number;
		name: string;
	};

	type Position = {
		time_update_msc: number;
		price_current: number;
		external_id: string;
		price_open: number;
		time_update: number;
		identifier: number;
		profit: number;
		time_msc: number;
		volume: number;
		comment: string;
		symbol: string;
		ticket: number;
		reason: number;
		swap: number;
		magic: number;
		time: number;
		type: number;
		sl: number;
		tp: number;
	};

	type Pair = {
		trade_percentage: number;
		symbol: Trade.Symbol;
		trade_count: number;
	};

	type Pairs = {
		total_trades: number;
		pairs: Pair[];
	};

	type Trade = {
		commission: number; // Commission charged by broker for this trade
		position_id: number; // ID of the position this trade belongs to
		external_id: string; // External identifier (can be empty or broker-specific)
		profit: number; // Profit or loss from this trade (in account currency)
		time_msc: number; // Timestamp in milliseconds since Unix epoch (preferred for precision)
		volume: number; // Trade volume (lot size)
		comment: string; // Optional comment attached to the trade
		price: number; // Execution price of the trade
		entry: number; // Entry type: 0 = open, 1 = close, 2 = partial
		fee: number; // Additional fees (if applicable)
		magic: number; // Magic number (used by EAs/bots to identify trades)
		order: number; // Order ticket ID that created this trade
		reason: number; // Reason for execution (manual, EA, stop loss, etc.)
		swap: number; // Swap/overnight interest applied to the trade
		symbol: string; // Trading symbol (e.g. EURUSD, BTCUSD)
		ticket: number; // Unique trade (deal) ID
		type: number; // Trade direction: 0 = BUY (long), 1 = SELL (short)
		time: number; // Timestamp in seconds since Unix epoch (less precise than time_msc)
	};

	type PositionTrade = {
		currency?: string; // Client side property. Is not returned by backend
		standalone: Trade | null;
		other_deals: Trade[];
		symbol: Trade.Symbol;
		position_id: number;
		closes: Trade[];
		opens: Trade[];
	};

	type All = {
		position: Position;
		account: Account;
		health: Health;
		trade: Trade;
	};
}
