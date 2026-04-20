import { isPositionTrade } from "./guards";

export function getTradeDirection(trade?: Trade.Trade | Trade.PositionTrade): Trade.PositionType | undefined {
	if (!trade) return undefined;

	const t = isPositionTrade(trade) ? trade.closes[0].type : trade.type;

	if (t === 0) return "Long";
	if (t === 1) return "Short";
	return undefined;
}

export const getPositionPnl = (trade: Trade.PositionTrade): number => trade.closes[0]?.profit ?? trade.standalone?.profit ?? 0;

export const getEntry = (trade: Trade.PositionTrade): Trade.Trade | undefined => trade.opens[0];
export const getPnl = (trade: Trade.PositionTrade): number => trade.closes[0]?.profit ?? 0;
export const getTime = (trade: Trade.PositionTrade): number => getEntry(trade)?.time_msc ?? 0;
export const getSide = (trade: Trade.PositionTrade): Trade.PositionType | undefined => getTradeDirection(getEntry(trade));
