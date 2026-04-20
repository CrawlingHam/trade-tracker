import { Separator as SeparatorPrimitive } from "radix-ui";
import type { SeparatorProps } from "./types";
import { type JSX } from "react";
import { cn } from "@/libs";

function Separator({ className, orientation = "horizontal", decorative = true, render = true, ...props }: SeparatorProps): JSX.Element | null {
	if (!render) return null;

	return (
		<SeparatorPrimitive.Root
			orientation={orientation}
			decorative={decorative}
			data-slot="separator"
			className={cn("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", className)}
			{...props}
		/>
	);
}

export { Separator };
