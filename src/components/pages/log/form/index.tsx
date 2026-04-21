import { useFirebaseCurrencyState, useFirebaseSymbolState, useLogTradeFormObject, useTradeAddTrade, useTradeTradesState } from "@/hooks";
import { Button, Card, CardContent, Input, Label } from "@/components/shared";
import { useMemo, useState, type JSX } from "react";
import { LOG_CONFIG } from "@/configs";
import LogFormFields from "./fields";
import { showToast } from "@/utils";
import LogFormDate from "./date";
import { cn } from "@/libs";

const REQUIRED_FIELDS: readonly Pages.Log.FormKey[] = ["date", "side", "entry", "exit", "lot", "pnl"];
const toKey = (value: number): string => value.toFixed(8);

function Form(): JSX.Element {
	const { form, addDate, addSide, addPnl, addLot, addNotes, addEntry, addExit } = useLogTradeFormObject();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const currency = useFirebaseCurrencyState();
	const symbol = useFirebaseSymbolState();
	const trades = useTradeTradesState();
	const addTrade = useTradeAddTrade();

	const tradeKeys = useMemo(
		() =>
			new Set(
				(trades ?? []).map((trade) => {
					const open = trade.opens[0];
					const close = trade.closes[0];
					const side = open?.type === 1 ? "Short" : "Long";
					return [
						open?.time_msc ?? 0,
						side,
						toKey(open?.price ?? 0),
						toKey(close?.price ?? 0),
						toKey(open?.volume ?? close?.volume ?? 0),
						toKey(close?.profit ?? 0),
						trade.symbol ?? "XAUUSD",
						trade.currency ?? "EUR",
					].join("|");
				})
			),
		[trades]
	);

	const isSubmitDisabled = REQUIRED_FIELDS.some((field) => !form?.[field]?.trim());

	const handleAdd = (): void => {
		if (!form || isSubmitting) return;

		const dateTimeMs = new Date(form.date ?? "").getTime();
		if (Number.isNaN(dateTimeMs)) return;

		const entryPrice = Number.parseFloat(form.entry ?? "0");
		const exitPrice = Number.parseFloat(form.exit ?? "0");
		const side = form.side === "Short" ? "Short" : "Long";
		const volume = Number.parseFloat(form.lot ?? "0");
		const profit = Number.parseFloat(form.pnl ?? "0");
		const sideType = form.side === "Short" ? 1 : 0;
		const accountCurrency = currency ?? "EUR";
		const pair = symbol ?? "XAUUSD";

		const tradeKey = [dateTimeMs, side, toKey(entryPrice), toKey(exitPrice), toKey(volume), toKey(profit), pair, accountCurrency].join("|");
		if (tradeKeys.has(tradeKey)) {
			showToast({
				type: "info",
				options: {
					description: "Trade already exists",
				},
			});
			return;
		}

		setIsSubmitting(true);
		const position_id = Date.now();
		const time = Math.floor(dateTimeMs / 1000);

		const baseTrade: Omit<Trade.Trade, "entry" | "price"> = {
			symbol: pair,
			comment: form.notes ?? "",
			time_msc: dateTimeMs,
			ticket: position_id,
			external_id: "",
			type: sideType,
			commission: 0,
			position_id,
			reason: 0,
			magic: 0,
			order: 0,
			swap: 0,
			volume,
			profit,
			fee: 0,
			time,
		};

		addTrade({
			opens: [{ ...baseTrade, entry: 0, price: entryPrice }],
			closes: [{ ...baseTrade, entry: 1, price: exitPrice }],
			currency: accountCurrency,
			symbol: pair,
			standalone: null,
			other_deals: [],
			position_id,
		});
		setIsSubmitting(false);
	};

	const handleChange = (key: Pages.Log.FormKey, value: string): void => {
		switch (key) {
			case "date":
				addDate(value);
				break;
			case "side":
				addSide(value);
				break;
			case "pnl":
				addPnl(value);
				break;
			case "lot":
				addLot(value);
				break;
			case "notes":
				addNotes(value);
				break;
			case "entry":
				addEntry(value);
				break;
			case "exit":
				addExit(value);
				break;
		}
	};

	return (
		<Card className="rounded-[14px] border-(--border) bg-(--bg1) py-0 shadow-none gap-0 pt-4">
			<CardContent className="p-6">
				<div className="mb-4 grid grid-cols-3 gap-3.5 max-[900px]:grid-cols-2">
					{LOG_CONFIG.TRADE_FORM_FIELDS.map((field): JSX.Element => {
						const hasStep = "step" in field;

						if (field.type === "date") return <LogFormDate key={`${field.label}-${field.key}`} />;
						if (field.type === "select") return <LogFormFields key={`${field.label}-${field.key}`} />;

						return (
							<div key={`${field.label}-${field.key}`} className="flex flex-col gap-1.5">
								<Label className="text-[11px] uppercase tracking-[0.08em] text-(--text2)">{field.label}</Label>

								<Input
									onChange={(e) => handleChange(field.key, e.target.value)}
									step={hasStep ? field.step : undefined}
									placeholder={field.placeholder}
									value={form?.[field.key] ?? ""}
									type={field.type}
									className={cn(
										"h-9 border-(--border) px-3 py-2 font-mono text-[13px] text-(--text) placeholder:text-(--text2) shadow-none ring-0",
										"[&::-webkit-inner-spin-button]:cursor-pointer [&::-webkit-outer-spin-button]:cursor-pointer [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
									)}
								/>
							</div>
						);
					})}
				</div>

				<Button
					className={cn(
						"w-full cursor-pointer rounded-lg border border-[rgba(0,208,132,0.3)] bg-(--green-dim) px-6 py-2.5 font-mono",
						"text-[13px] tracking-[0.04em] text-(--green) transition-all hover:bg-[rgba(0,208,132,0.2)]"
					)}
					disabled={isSubmitDisabled || isSubmitting}
					onClick={handleAdd}
					variant="ghost"
					type="button"
				>
					+ Add trade
				</Button>
			</CardContent>
		</Card>
	);
}

export default Form;
