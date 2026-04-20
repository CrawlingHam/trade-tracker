import type { ButtonProps } from "@/components/shared";

declare global {
	namespace Pages.NotFound {
		type Button404 = {
			to: App.Pages.Route;
			text: string;
		};

		type Span = { text: Button404["text"]; example?: string };

		type Paragraph = Omit<Button404, "to"> & {
			span?: Span;
		};

		namespace Props {
			type LinkButton = Button404 & {
				onClick?: Callable.Sync.Argument<void, void>;
				variant: ButtonProps["variant"];
				className?: string;
			};

			type NotFound = {
				paragraph: Paragraph;
				buttons: Button404[];
			};
		}
	}
}

export {};
