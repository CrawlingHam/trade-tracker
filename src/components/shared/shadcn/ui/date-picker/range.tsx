import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { ChevronDownIcon } from "lucide-react";
import { useState, type JSX } from "react";
import { Calendar } from "../calendar";
import { Button } from "../button";
import { format } from "date-fns";

function DateRangePicker(): JSX.Element {
	const [open, setOpen] = useState<boolean>(false);
	const [date, setDate] = useState<Date>();

	const handleSelect = (d: Date | undefined): void => {
		if (!d) return;
		setDate(d);
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
					data-empty={!date}
					variant="outline"
					type="button"
				>
					{date ? format(date, "PPP") : <span>Pick a date</span>}
					<ChevronDownIcon className="size-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-auto p-0" align="start">
				<Calendar defaultMonth={date} selected={date} mode="single" onSelect={handleSelect} />
			</PopoverContent>
		</Popover>
	);
}

export { DateRangePicker };
