import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { type DatePickerFieldProps } from "./types";
import { format, isValid, parse } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useState, type JSX } from "react";
import { Calendar } from "../calendar";
import { Button } from "../button";
import { cn } from "@/libs";

function DatePickerField({ value, onChange, classNames }: DatePickerFieldProps): JSX.Element {
	const selected = value ? parse(value, "yyyy-MM-dd", new Date()) : undefined;
	const safeSelected = selected && isValid(selected) ? selected : undefined;
	const [open, setOpen] = useState<boolean>(false);

	const handleSelect = (d: Date | undefined): void => {
		if (!d) return;
		onChange(format(d, "yyyy-MM-dd"));
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					data-empty={!safeSelected}
					variant="outline"
					type="button"
					className={cn(
						"h-9 w-full justify-between border-(--border) bg-(--bg3) px-3 font-mono text-left text-[13px] font-normal text-(--text) shadow-none ring-0",
						"data-[empty=true]:text-(--text2)",
						classNames?.trigger
					)}
				>
					{safeSelected ? format(safeSelected, "PPP") : <span>Pick a date</span>}
					<ChevronDownIcon className="size-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className={cn("w-auto p-0", classNames?.content?.container)} align="start">
				<Calendar defaultMonth={safeSelected} selected={safeSelected} onSelect={handleSelect} mode="single" className={classNames?.content?.calendar} />
			</PopoverContent>
		</Popover>
	);
}

export { DatePickerField };
