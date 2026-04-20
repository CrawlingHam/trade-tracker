import { LOG_CONFIG } from "@/configs";

declare global {
	namespace Trade {
		type PositionType = (typeof LOG_CONFIG.DIRECTION_OPTIONS)[number];

		type TradeObject = {
			entry: Trade.Trade;
			exit: Trade.Trade;
		};

		type GroupedTrades = { position_id: number } & Partial<TradeObject>;

		type GroupedTradesRecord = Record<number, GroupedTrades>;
	}
}

export {};
