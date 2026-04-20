import { useMobile, useNavigationbarTabObject, useRoute } from "@/hooks";
import { Button } from "@/components/shared";
import { useEffect, type JSX } from "react";
import { NAVBAR_CONFIG } from "@/configs";
import { isUndefined } from "@/utils";
import { Link } from "react-router";
import { cn } from "@/libs";

const { TABS } = NAVBAR_CONFIG;

function Tabs(): JSX.Element {
	const { tab, setTab } = useNavigationbarTabObject();
	const { route } = useRoute();
	const isMobile = useMobile();

	const routeReady = !isUndefined(route);

	useEffect(() => {
		if (!routeReady || !route) return;
		const active = TABS.find(({ ROUTE }) => ROUTE.toLowerCase() === route.toLowerCase());
		if (!active || active.LABEL === tab) return;
		setTab(active.LABEL);
	}, [routeReady, route, setTab, tab]);

	return (
		<>
			{TABS.map(({ LABEL, ROUTE }): JSX.Element => {
				const isActive = routeReady && tab === LABEL;

				return (
					<Link to={ROUTE} key={`${LABEL}-${ROUTE}`} id={`${LABEL}-${ROUTE}`}>
						<Button
							onClick={() => void setTab(LABEL)}
							disabled={!routeReady}
							variant="ghost"
							type="button"
							size="sm"
							className={cn(
								"cursor-pointer rounded-md border w-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.06em] transition-colors duration-150",
								isMobile ? "max-w-none" : "max-w-32",
								!routeReady
									? "animate-pulse border-transparent bg-slate-100 text-transparent dark:bg-slate-900"
									: isActive
									? "border-(--green-dim) bg-(--green-dim2) text-(--green)"
									: "border-transparent text-(--text2) hover:bg-(--bg3) hover:text-(--text)"
							)}
						>
							{LABEL}
						</Button>
					</Link>
				);
			})}
		</>
	);
}

export default Tabs;
