import type { VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { buttonVariants } from "./variants";

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	ButtonVariants & {
		asChild?: boolean;
	};
