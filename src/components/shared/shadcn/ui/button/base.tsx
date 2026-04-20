import { forwardRef, type JSX } from "react";
import { buttonVariants } from "./variants";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonProps } from "./types";
import { cn } from "@/libs";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref): JSX.Element => {
	const Comp = asChild ? Slot : "button";
	return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});

Button.displayName = "Button";

export { Button };
