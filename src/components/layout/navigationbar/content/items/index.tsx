import { Separator } from "@/components/shared";
import { useMobile } from "@/hooks";
import Currency from "./currency";
import { type JSX } from "react";
import { cn } from "@/libs";
import Tabs from "./tabs";

function Items(): JSX.Element {
	const isMobile = useMobile();

	return (
		<nav
			className={cn(
				"flex items-center justify-end ml-auto gap-1 px-2 w-48 max-h-[calc(100vh-35rem)] md:w-56 md:max-h-[calc(100vh-40rem)]",
				isMobile && "flex-col items-stretch gap-2 px-2 py-2"
			)}
		>
			<Tabs />
			<Separator className="my-1 border border-slate-100 dark:border-slate-900" render={isMobile} />
			<Currency />
		</nav>
	);
}

export default Items;
