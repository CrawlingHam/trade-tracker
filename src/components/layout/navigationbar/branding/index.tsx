import { useAppIsLoading, useBreakpoint } from "@/hooks";
import { BREAKPOINTS, ROUTES } from "@/configs";
import { Link } from "react-router";
import type { JSX } from "react";
import Menu from "./menu";

function Branding(): JSX.Element {
	const isBreakpoint = useBreakpoint(BREAKPOINTS.XXS);
	const isLoading = useAppIsLoading();

	return (
		<div className="pl-4 w-full md:w-1/2 flex justify-start transition-all duration-50">
			{isLoading ? (
				<span className="flex items-center bg-slate-200 dark:bg-slate-900 animate-pulse rounded-md w-1/5 mt-2 h-12" />
			) : (
				<div className="flex flex-nowrap gap-2 sm:gap-4 items-center justify-start min-w-0">
					<Link
						to={ROUTES.APP.HOME.BASE.ROUTE}
						className="flex items-center justify-center no-underline focus-visible:outline-none cursor-pointer min-w-0 flex-1"
					>
						<div className="flex items-center gap-2.5 min-w-0">
							<span className="text-xl text-(--green)">◈</span>

							<span className="[font-family:var(--font-display)] text-sm sm:text-base font-extrabold tracking-[0.12em] truncate">
								{document.title.toUpperCase()}
							</span>
						</div>
					</Link>

					{!isBreakpoint && <div className="shrink-0"><Menu /></div>}
				</div>
			)}
		</div>
	);
}

export default Branding;
