import { useAppIsLoading } from "@/hooks";
import Branding from "./branding";
import { type JSX } from "react";
import Content from "./content";
import { cn } from "@/libs";

function Navigationbar(): JSX.Element {
	const isLoading = useAppIsLoading();

	return (
		<>
			<nav className="fixed w-full left-0 right-0 top-0 z-50 shadow-md h-16 backdrop-blur-xs focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
				<div className={cn("flex w-full h-full", !isLoading && "animated-border-b")}>
					<div className="flex w-full items-center justify-between gap-1">
						<Branding />
						<Content />
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navigationbar;
