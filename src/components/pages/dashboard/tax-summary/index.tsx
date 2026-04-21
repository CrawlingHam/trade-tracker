import { useTradeAccountState, useTradeTradesState } from "@/hooks";
import { buildTaxBuckets } from "@/utils";
import { useMemo, type JSX } from "react";
import ExportTaxSummary from "./export";
import MonthlySummary from "./monthly";
import YearlySummary from "./yearly";

function TaxSummary(): JSX.Element {
	const account = useTradeAccountState();
	const trades = useTradeTradesState();

	const closes = useMemo<Trade.Trade[]>(() => (trades ?? []).flatMap((trade) => trade.closes).sort((a, b) => (a.time_msc ?? 0) - (b.time_msc ?? 0)), [trades]);
	const monthly = useMemo<Trade.TaxBucket[]>(() => buildTaxBuckets(closes, "month"), [closes]);
	const yearly = useMemo<Trade.TaxBucket[]>(() => buildTaxBuckets(closes, "year"), [closes]);

	const currency = account?.currency ?? "USD";

	const signedCurrencyFormatter = useMemo(
		() =>
			new Intl.NumberFormat(undefined, {
				style: "currency",
				currency,
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}),
		[currency]
	);

	const formatSignedMoney = (value: number): string => {
		const absolute = signedCurrencyFormatter.format(Math.abs(value));
		if (value > 0) return `+${absolute}`;
		if (value < 0) return `-${absolute}`;
		return absolute;
	};

	return (
		<div className="rounded-[14px] border border-(--border) bg-(--bg1) p-5">
			<div className="mb-3 flex items-center justify-between gap-3">
				<p className="[font-family:var(--font-display)] text-[11px] font-semibold uppercase tracking-widest text-(--text2)">Tax summary</p>
				<ExportTaxSummary monthly={monthly} yearly={yearly} formatSignedMoney={formatSignedMoney} currency={currency} />
			</div>

			<MonthlySummary items={monthly} formatSignedMoney={formatSignedMoney} />
			<YearlySummary items={yearly} formatSignedMoney={formatSignedMoney} />
		</div>
	);
}

export default TaxSummary;
