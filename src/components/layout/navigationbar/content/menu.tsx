import { Button, Popover, PopoverContent, PopoverTrigger } from "@/components/shared";
import { Settings } from "lucide-react";
import { type JSX } from "react";
import Items from "./items";
import { cn } from "@/libs";

function Menu(): JSX.Element {
	return (
		<Popover>
			<div className="flex justify-end items-center px-2 w-full h-full transition-all duration-50">
				<PopoverTrigger asChild>
					<Button
						variant="ghost"
						type="button"
						size="sm"
						className={cn(
							"rounded border border-(--border2) px-1.5 py-0.5 w-8 h-8 text-[10px] sm:text-xs tracking-widest text-(--text3)",
							"cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors duration-150 max-w-34 sm:max-w-none",
							"focus-visible:ring-2 focus-visible:ring-(--green) focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg)"
						)}
					>
						<Settings className="text-(--text3)" />
					</Button>
				</PopoverTrigger>
			</div>

			<PopoverContent className="mt-1 overflow-hidden rounded-lg shadow-lg w-auto bg-white dark:bg-black" align="end">
				<Items />
			</PopoverContent>
		</Popover>
	);
}

export default Menu;
