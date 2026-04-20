import type { ComponentProps, JSX } from "react";
import { cn } from "@/libs";

function Input({ className, type, ...props }: ComponentProps<"input">): JSX.Element {
	return (
		<input
			data-slot="input"
			type={type}
			className={cn(
				"dark:bg-input/90 border border-transparent ring-slate-300 dark:border-slate-600 dark:ring-slate-900/50",
				"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
				"dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 h-8",
				"rounded-lg border bg-transparent px-2.5 py-1 text-base transition-colors file:h-6 file:text-sm file:font-medium",
				"ring-1 aria-invalid:ring-1 md:text-sm w-full min-w-0 outline-none",
				"file:inline-flex file:border-0 file:bg-transparent file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none",
				"disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}
			{...props}
		/>
	);
}

export { Input };
