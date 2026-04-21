export const toCurrencyString = (n: number): string => (n >= 0 ? "+" : "-") + "$" + Math.abs(n).toFixed(2);

export const escapeCsv = (value: string): string => `"${value.replaceAll('"', '""')}"`;

export function toBucketLabel(timeMsc: number, granularity: "month" | "year"): string {
	const date = new Date(timeMsc);
	if (granularity === "year") return String(date.getFullYear());
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function buildTaxBuckets(closes: Trade.Trade[], granularity: "month" | "year"): Trade.TaxBucket[] {
	const map = new Map<string, Omit<Trade.TaxBucket, "label">>();

	closes.forEach((close) => {
		const label = toBucketLabel(close.time_msc ?? 0, granularity);
		const current = map.get(label) ?? { pnl: 0, commission: 0, fee: 0, swap: 0, net: 0 };

		const commission = Number(close.commission ?? 0);
		const pnl = Number(close.profit ?? 0);
		const swap = Number(close.swap ?? 0);
		const fee = Number(close.fee ?? 0);

		const net = pnl - commission - fee + swap;

		map.set(label, {
			commission: current.commission + commission,
			swap: current.swap + swap,
			pnl: current.pnl + pnl,
			fee: current.fee + fee,
			net: current.net + net,
		});
	});

	return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([label, values]) => ({ label, ...values }));
}

export const formatMoney = (value: number, moneyFormatter: Intl.NumberFormat): string => moneyFormatter.format(value);
export const formatSignedMoney = (value: number, moneyFormatter: Intl.NumberFormat): string => {
	const abs = formatMoney(Math.abs(value), moneyFormatter);
	if (value > 0) return `+${abs}`;
	if (value < 0) return `-${abs}`;
	return abs;
};
