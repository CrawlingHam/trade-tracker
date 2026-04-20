import { useBreakpoint } from "./base";
import { BREAKPOINTS } from "@/configs";

/** Viewport is below 768px (mobile). */
export function useMobile(callback?: Callable.Sync.Void): boolean {
	return useBreakpoint(BREAKPOINTS.MD, callback);
}
