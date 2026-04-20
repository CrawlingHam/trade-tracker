import { BREAKPOINTS } from "@/configs";

declare global {
	namespace Alias {
		type Logo = React.ReactNode | React.JSX.Element;
		type Breakpoint = keyof typeof BREAKPOINTS;
		type Status = "success" | "error";

		type Child = React.ReactNode | React.JSX.Element;
		type Children = Child | Child[];
	}
}

export {};
