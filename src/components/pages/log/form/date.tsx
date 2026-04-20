import { Label, DatePickerField } from "@/components/shared";
import { format, isValid, parse } from "date-fns";
import { useLogTradeFormObject } from "@/hooks";
import { type JSX } from "react";

const ISO_DATE_FORMAT = "yyyy-MM-dd";

function LogFormDate(): JSX.Element {
	const { form, addDate } = useLogTradeFormObject();

	const value = form?.date ?? "";

	const handleIsoChange = (iso: string): void => {
		const next = parse(iso, ISO_DATE_FORMAT, new Date());
		if (!isValid(next)) return;

		addDate(format(next, ISO_DATE_FORMAT));
	};

	return (
		<div className="flex flex-col gap-1.5">
			<Label className="text-[11px] uppercase tracking-[0.08em] text-(--text2)">Date</Label>
			<DatePickerField
				onChange={handleIsoChange}
				value={value}
				classNames={{
					trigger: "bg-white dark:bg-black hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer",
					content: { container: "bg-white dark:bg-black" },
				}}
			/>
		</div>
	);
}

export default LogFormDate;
