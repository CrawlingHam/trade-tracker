import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTradeAccountState, useTradeTradesState } from "@/hooks";
import { useMemo, type JSX } from "react";

function BalanceChart(): JSX.Element {
	const account = useTradeAccountState();
	const trades = useTradeTradesState();

	const currencyCode = account?.currency ?? "USD";

	const currencyFormatter = useMemo(
		() =>
			new Intl.NumberFormat(undefined, {
				style: "currency",
				currency: currencyCode,
				maximumFractionDigits: 2,
			}),
		[currencyCode]
	);

	const closes = useMemo<Trade.PositionTrade["closes"][number][]>(
		() => (trades ?? []).flatMap((trade) => trade.closes).sort((a, b) => (a.time_msc ?? 0) - (b.time_msc ?? 0)),
		[trades]
	);

	const balCurve = useMemo(() => {
		const totalPnl = closes.reduce((sum, close) => sum + (Number(close.profit) || 0), 0);
		const currentBalance = account?.balance ?? 0;
		let runBal = Number((currentBalance - totalPnl).toFixed(2));
		const curve = [{ name: "Start", date: "Start", balance: runBal }];

		closes.forEach((close, index) => {
			const time = close.time_msc ?? 0;
			runBal += Number(close.profit) || 0;
			curve.push({
				name: `${time}-${index}`,
				date: new Date(time).toLocaleDateString(),
				balance: Number(runBal.toFixed(2)),
			});
		});

		return curve;
	}, [account?.balance, closes]);

	const xAxisTicks = useMemo<string[]>(() => {
		if (balCurve.length <= 2) return balCurve.map((point) => point.name);
		const ticks: string[] = [balCurve[0].name];
		let previousDate = balCurve[0].date;

		for (let i = 1; i < balCurve.length - 1; i += 1) {
			const point = balCurve[i];
			if (point.date !== previousDate) {
				ticks.push(point.name);
				previousDate = point.date;
			}
		}

		ticks.push(balCurve[balCurve.length - 1].name);
		return ticks;
	}, [balCurve]);

	return (
		<div className="rounded-[14px] border border-(--border) bg-(--bg1) px-5 pb-3 pt-5 disable-focus h-full">
			<p className="mb-3 [font-family:var(--font-display)] text-[11px] font-semibold uppercase tracking-widest text-(--text2)">Balance curve</p>

			<ResponsiveContainer width="100%" height={600}>
				<AreaChart data={balCurve} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} className="disable-focus bg-(--bg2) rounded-lg">
					<defs>
						<linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#4d9fff" stopOpacity={0.3} />
							<stop offset="95%" stopColor="#4d9fff" stopOpacity={0} />
						</linearGradient>
					</defs>

					<XAxis
						dataKey="name"
						ticks={xAxisTicks}
						tick={{ fill: "var(--text3)", fontSize: 10, fontFamily: "var(--font-mono)" }}
						tickFormatter={(value: string) => balCurve.find((point) => point.name === value)?.date ?? ""}
						axisLine={false}
						tickLine={false}
					/>

					<YAxis
						tick={{ fill: "var(--text3)", fontSize: 10, fontFamily: "var(--font-mono)" }}
						tickFormatter={(v) => currencyFormatter.format(v as number)}
						axisLine={false}
						tickLine={false}
						width={55}
					/>

					<Tooltip
						cursor={{ stroke: "var(--border2)", strokeWidth: 1 }}
						labelFormatter={(_value: unknown, payload: readonly { payload?: { date?: string } }[]) => payload?.[0]?.payload?.date ?? "—"}
						formatter={(v: unknown) => [currencyFormatter.format(v as number), "Balance"]}
						contentStyle={{
							border: "1px solid var(--border2)",
							fontFamily: "var(--font-mono)",
							background: "var(--bg3)",
							borderRadius: 8,
							fontSize: 12,
						}}
					/>

					<Area type="monotone" dataKey="balance" stroke="#4d9fff" strokeWidth={2} fill="url(#balGrad)" dot={false} activeDot={{ r: 4, fill: "#4d9fff" }} />
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}

export default BalanceChart;
