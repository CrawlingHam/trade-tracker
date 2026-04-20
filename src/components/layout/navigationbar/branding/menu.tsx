import { Button, Popover, PopoverContent, PopoverTrigger } from "@/components/shared";
import { useBreakpoint, useTradeSelectedPairState } from "@/hooks";
import { useState, type JSX } from "react";
import { BREAKPOINTS } from "@/configs";
import Symbols from "./symbols";
import { cn } from "@/libs";

function Menu(): JSX.Element {
	const selectedPair = useTradeSelectedPairState();
	const breakpoint = useBreakpoint(BREAKPOINTS.XS);
	const [open, setOpen] = useState<boolean>(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					type="button"
					size="sm"
					className={cn(
						"h-auto rounded border border-(--border2) px-1.5 py-0.5 text-[10px] sm:text-xs tracking-widest text-(--text3)",
						"cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors duration-150 max-w-34 sm:max-w-none",
						breakpoint ? "hidden" : "block"
					)}
				>
					<span className="truncate">{selectedPair?.symbol ?? "Select a pair"}</span>
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-[min(13rem,calc(100vw-2rem))] sm:w-52 p-1 mt-2 bg-white dark:bg-black">
				<div className="flex flex-col gap-1">
					<Symbols setOpen={setOpen} />
				</div>
			</PopoverContent>
		</Popover>
	);
}

export default Menu;
