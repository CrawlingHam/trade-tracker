import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef, type JSX } from "react";
import { Content, Portal } from "@radix-ui/react-popover";
import { cn } from "@/libs";

const PopoverContent = forwardRef<ComponentRef<typeof Content>, ComponentPropsWithoutRef<typeof Content>>(
	({ className, align = "center", sideOffset = 13, ...props }, ref): JSX.Element => (
		<Portal>
			<Content
				sideOffset={sideOffset}
				align={align}
				ref={ref}
				className={cn(
					"z-50 w-72 rounded-md mr-3 border border-slate-200 dark:border-slate-900 shadow-md outline-none p-1 transition-colors duration-200",
					className
				)}
				{...props}
			/>
		</Portal>
	)
);

PopoverContent.displayName = Content.displayName;

export { PopoverContent };
