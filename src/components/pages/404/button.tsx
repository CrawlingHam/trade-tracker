import { Button } from "@/components/shared";
import { Link } from "react-router";
import { type JSX } from "react";
import { cn } from "@/libs";

function LinkButton({ to, text, variant, className, onClick }: Pages.NotFound.Props.LinkButton): JSX.Element {
	const handleClick = (): void => void onClick?.();

	return (
		<Button
			onClick={handleClick}
			variant={variant}
			className={cn(
				"text-base font-semibold shadow-md transition hover:cursor-pointer",
				"inline-flex h-8 items-center justify-center rounded-md px-8",
				"dark:bg-slate-100 dark:hover:bg-slate-200",
				"bg-slate-900 hover:bg-slate-900",
				"text-white dark:text-slate-900",
				"hover:brightness-110",
				"w-[220px]",
				className
			)}
		>
			<Link to={to}>{text}</Link>
		</Button>
	);
}

export default LinkButton;
