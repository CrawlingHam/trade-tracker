import { Button, Popover, PopoverContent, PopoverTrigger, SearchInput } from "@/components/shared";
import { useFirebaseCurrencyObject, useMobile } from "@/hooks";
import { useMemo, useState, type JSX } from "react";
import { NAVBAR_CONFIG } from "@/configs";
import { cn } from "@/libs";

const { CURRENCIES } = NAVBAR_CONFIG;

function Currency(): JSX.Element {
	const { currency, setCurrency } = useFirebaseCurrencyObject();
	const [open, setOpen] = useState<boolean>(false);
	const [query, setQuery] = useState<string>("");
	const isMobile = useMobile();

	const filteredCurrencies = useMemo(
		() =>
			CURRENCIES.filter(({ CODE, LABEL }) => {
				const normalizedQuery = query.trim().toLowerCase();
				if (!normalizedQuery) return true;
				return CODE.toLowerCase().includes(normalizedQuery) || LABEL.toLowerCase().includes(normalizedQuery);
			}),
		[query]
	);

	const handleSelectCurrency = async (currency: string): Promise<void> => {
		await setCurrency(currency);
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					className={cn(
						"rounded border border-(--border2) px-2 py-1.5 m-1 text-[10px] sm:text-xs tracking-widest text-(--text3) cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors duration-150",
						isMobile ? "w-full justify-center m-0" : ""
					)}
					variant="ghost"
					type="button"
					size="sm"
				>
					{currency ? <span className="truncate">{currency}</span> : <span className="animate-pulse cursor-wait text-transparent max-w-12">Loading...</span>}
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-[min(16rem,calc(100vw-2rem))] p-1 mt-2 bg-white dark:bg-black">
				<div className="px-1 pb-1">
					<SearchInput label="" placeholder="Search currency..." value={query} onChange={setQuery} />
				</div>

				<div className="flex max-h-64 flex-col gap-1 overflow-y-auto">
					{filteredCurrencies.map(
						({ CODE, LABEL }): JSX.Element => (
							<Button
								onClick={() => void handleSelectCurrency(CODE)}
								variant="ghost"
								type="button"
								key={CODE}
								size="sm"
								className={cn(
									"grid w-full h-auto grid-cols-[3rem_minmax(0,1fr)] items-center gap-2 rounded px-2 py-1.5 text-xs tracking-wide text-(--text2) transition-colors duration-150 cursor-pointer",
									currency === CODE ? "bg-slate-100 dark:bg-slate-900" : "hover:bg-slate-100 dark:hover:bg-slate-900"
								)}
							>
								<span className="text-left">{CODE}</span>
								<span className="min-w-0 truncate text-left text-[10px] text-(--text3)">{LABEL}</span>
							</Button>
						)
					)}
					{filteredCurrencies.length === 0 && <p className="px-2 py-1.5 text-xs text-(--text3)">No currencies found.</p>}
				</div>
			</PopoverContent>
		</Popover>
	);
}

export default Currency;
