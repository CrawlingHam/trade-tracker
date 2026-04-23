import { isPositionTrade } from "./guards";

export function getTradeDirection(trade?: Trade.Trade | Trade.PositionTrade): Trade.PositionType | undefined {
	if (!trade) return undefined;

	const t = isPositionTrade(trade) ? trade.closes[0].type : trade.type;

	if (t === 0) return "Long";
	if (t === 1) return "Short";
	return undefined;
}

export const getPositionRealizedDeals = (trade: Trade.PositionTrade): Trade.Trade[] => {
	if (trade.closes.length > 0) return trade.closes;
	return trade.standalone ? [trade.standalone] : [];
};

export const getDealNetPnl = (deal: Trade.Trade): number => {
	const pnl = Number(deal.profit) || 0;
	const commission = Number(deal.commission) || 0;
	const fee = Number(deal.fee) || 0;
	const swap = Number(deal.swap) || 0;
	return pnl - commission - fee + swap;
};

export const getPositionPnl = (trade: Trade.PositionTrade): number =>
	getPositionRealizedDeals(trade).reduce((sum, deal) => sum + (Number(deal.profit) || 0), 0);

export const getPositionNetPnl = (trade: Trade.PositionTrade): number =>
	getPositionRealizedDeals(trade).reduce((sum, deal) => sum + getDealNetPnl(deal), 0);

export const getPositionLastCloseTime = (trade: Trade.PositionTrade): number =>
	getPositionRealizedDeals(trade).reduce((latest, deal) => Math.max(latest, deal.time_msc ?? 0), 0);

export const getEntry = (trade: Trade.PositionTrade): Trade.Trade | undefined => trade.opens[0];
export const getPnl = (trade: Trade.PositionTrade): number => getPositionPnl(trade);
export const getTime = (trade: Trade.PositionTrade): number => getEntry(trade)?.time_msc ?? 0;
export const getSide = (trade: Trade.PositionTrade): Trade.PositionType | undefined => getTradeDirection(getEntry(trade));
