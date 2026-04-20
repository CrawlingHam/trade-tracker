import { Button, Card, CardContent, Input, Label } from "@/components/shared";
import { useFirebaseSymbolState, useLogTradeFormObject, useTradeAddTrade } from "@/hooks";
import { LOG_CONFIG } from "@/configs";
import LogFormFields from "./fields";
import LogFormDate from "./date";
import { type JSX } from "react";
import { cn } from "@/libs";

const REQUIRED_FIELDS: readonly Pages.Log.FormKey[] = ["date", "side", "entry", "exit", "lot", "pnl"];

function Form(): JSX.Element {
	const { form, addDate, addSide, addPnl, addLot, addNotes, addEntry, addExit } = useLogTradeFormObject();
	const symbol = useFirebaseSymbolState();
	const addTrade = useTradeAddTrade();

	const isSubmitDisabled = REQUIRED_FIELDS.some((field) => !form?.[field]?.trim());

	const handleAdd = (): void => {
		if (!form) return;

		const dateTimeMs = new Date(form.date ?? "").getTime();
		if (Number.isNaN(dateTimeMs)) return;

		const position_id = Date.now();
		const sideType = form.side === "Short" ? 1 : 0;
		const entryPrice = Number.parseFloat(form.entry ?? "0");
		const exitPrice = Number.parseFloat(form.exit ?? "0");
		const volume = Number.parseFloat(form.lot ?? "0");
		const profit = Number.parseFloat(form.pnl ?? "0");
		const time = Math.floor(dateTimeMs / 1000);

		const baseTrade: Omit<Trade.Trade, "entry" | "price"> = {
			symbol: symbol ?? "XAUUSD",
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
			symbol: symbol ?? "XAUUSD",
			standalone: null,
			other_deals: [],
			position_id,
		});
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
					disabled={isSubmitDisabled}
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
