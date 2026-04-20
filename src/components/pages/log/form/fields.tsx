import { Button, Label, Popover, PopoverContent, PopoverTrigger } from "@/components/shared";
import { useEffect, useState, type JSX } from "react";
import { useLogTradeFormObject } from "@/hooks";
import { ChevronDownIcon } from "lucide-react";
import { LOG_CONFIG } from "@/configs";
import { cn } from "@/libs";

function LogFormFields(): JSX.Element {
	const [open, setOpen] = useState<boolean>(false);
	const { form, addSide } = useLogTradeFormObject();

	useEffect(() => {
		if (form?.side) return;
		addSide(LOG_CONFIG.DIRECTION_OPTIONS[0]);
	}, [form?.side, addSide]);

	const handleDirectionChange = (option: Trade.PositionType): void => {
		addSide(option);
		setOpen(false);
	};

	return (
		<div className="flex flex-col gap-1.5 ">
			<Label className="text-[11px] uppercase tracking-[0.08em] text-(--text2)">Side</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						className="h-9 w-full justify-between border-(--border) px-3 font-mono text-[13px] font-normal text-(--text) shadow-none ring-0 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
						variant="outline"
						type="button"
					>
						{form?.side}
						<ChevronDownIcon className="size-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>

				<PopoverContent className="w-auto min-w-(--radix-popover-trigger-width) p-1 bg-white dark:bg-black" align="start">
					<div className="flex flex-col gap-0.5">
						{LOG_CONFIG.DIRECTION_OPTIONS.map(
							(option: Trade.PositionType): JSX.Element => (
								<Button
									onClick={() => handleDirectionChange(option)}
									variant="ghost"
									type="button"
									key={option}
									size="sm"
									className={cn(
										"h-8 w-full justify-start font-mono text-[13px] cursor-pointer",
										option === form?.side ? "bg-slate-100 dark:bg-slate-900" : "hover:bg-slate-100 dark:hover:bg-slate-900"
									)}
								>
									{option}
								</Button>
							)
						)}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}

export default LogFormFields;
