import { Button, Popover, PopoverContent, PopoverTrigger } from "@/components/shared";
import { useThemeObject } from "@/hooks/theme/shallow";
import { IoSunnyOutline } from "react-icons/io5";
import { NAVBAR_CONFIG } from "@/configs";
import { type JSX } from "react";
import { cn } from "@/libs";

function Theme(): JSX.Element {
	const { theme, setTheme } = useThemeObject();

	const handleSetTheme = (theme: Theme.Theme): void => {
		setTheme(theme);
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className="w-8 h-8 rounded border border-(--border2) m-1 p-2 mr-2 text-[10px] sm:text-xs tracking-widest text-(--text3) cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors duration-150 max-w-34 sm:max-w-none"
					variant="ghost"
					type="button"
					size="sm"
				>
					<span className="truncate">
						<IoSunnyOutline />
					</span>
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-[min(13rem,calc(100vw-2rem))] sm:w-52 p-1 mt-2 bg-white dark:bg-black">
				<div className="flex flex-col gap-1">
					{NAVBAR_CONFIG.THEMES.map(
						({ LABEL, VALUE }): JSX.Element => (
							<Button
								onClick={() => void handleSetTheme(VALUE)}
								variant="ghost"
								type="button"
								key={VALUE}
								size="sm"
								className={cn(
									"w-full h-auto justify-start rounded px-2 py-1.5 text-xs tracking-wide text-(--text2) transition-colors duration-150 cursor-pointer whitespace-normal wrap-break-word",
									VALUE === theme ? "bg-slate-100 dark:bg-slate-900" : "hover:bg-slate-100 dark:hover:bg-slate-900"
								)}
							>
								{LABEL}
							</Button>
						)
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}

export default Theme;
