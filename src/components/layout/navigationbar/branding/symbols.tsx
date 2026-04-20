import { useFirebaseSetSymbolAction, useTradeSelectedPairObject } from "@/hooks";
import { Button, Separator } from "@/components/shared";
import { NAVBAR_CONFIG, PAIRS } from "@/configs";
import { Fragment, type JSX } from "react";
import { cn } from "@/libs";

const { SYMBOLS } = NAVBAR_CONFIG.PAIRS;

function Symbols({ setOpen }: { setOpen: Callable.Sync.Argument<boolean, void> }): JSX.Element {
	const { selectedPair, pairs, setSelectedPair } = useTradeSelectedPairObject();
	const setSymbol = useFirebaseSetSymbolAction();

	const handleClick = async (pair: Trade.Pair | undefined): Promise<void> => {
		if (!pair) return;

		await setSymbol(pair.symbol);
		setSelectedPair(pair);
		setOpen(false);
	};

	return (
		<>
			{SYMBOLS.map((pair, index): JSX.Element => {
				const symbol = pair.symbol;
				const Icon = PAIRS.ICONS[pair.type] ?? PAIRS.ICONS.default;

				const matchingPair = pairs?.pairs?.find((p) => p.symbol === symbol);

				const prev = index > 0 ? SYMBOLS[index - 1] : undefined;
				const showTypeSeparator = index > 0 && prev !== undefined && pair.type !== prev.type;

				return (
					<Fragment key={symbol}>
						<Separator render={showTypeSeparator} orientation="horizontal" className="my-1 border border-slate-100 dark:border-slate-900" />

						<Button
							onClick={() => void handleClick(matchingPair ?? { symbol, trade_count: 0, trade_percentage: 0 })}
							variant="ghost"
							type="button"
							size="sm"
							className={cn(
								"w-full h-auto justify-start rounded px-2 py-1.5 text-xs tracking-wide text-(--text2) transition-colors duration-150 cursor-pointer whitespace-normal wrap-break-word",
								symbol === selectedPair?.symbol ? "bg-slate-100 dark:bg-slate-900" : "hover:bg-slate-100 dark:hover:bg-slate-900"
							)}
						>
							<Icon className="w-4 h-4" />
							<span className="truncate">{pair.display}</span>
						</Button>
					</Fragment>
				);
			})}
		</>
	);
}

export default Symbols;
