import { useEffect, useMemo, useRef, useState } from "react";
import { isArray, isString } from "@/utils";
import { BREAKPOINTS } from "@/configs";

const CALLBACK_DEBOUNCE_MS = 150;

/**
 * Hook to track viewport width against a custom breakpoint.
 * @param breakpoints - Breakpoint key(s); viewport is "below" when width < breakpoint
 * @param callback - Optional; run after viewport has stayed below breakpoint for a short debounce
 * @returns `true` when viewport width is below the breakpoint, else `false`
 */
export function useBreakpoint(breakpoints: (Alias.Breakpoint | number) | (Alias.Breakpoint | number)[], callback?: Callable.Sync.Void): boolean {
	const callbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [matches, setMatches] = useState<boolean>(false);
	const lastMatchesRef = useRef<boolean>(false);

	const breakpointValues = useMemo((): number[] => {
		const toPx = (b: Alias.Breakpoint | number): number => (isString(b) ? BREAKPOINTS[b] : b);
		return isArray(breakpoints) ? breakpoints.map(toPx) : [toPx(breakpoints)];
	}, [breakpoints]);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const maxPx = Math.max(...breakpointValues) - 1;
		const mql = window.matchMedia(`(max-width: ${maxPx}px)`);

		requestAnimationFrame(() => setMatches(mql.matches));

		const handler = (e: MediaQueryListEvent): void => setMatches(e.matches);
		mql.addEventListener("change", handler);
		return (): void => mql.removeEventListener("change", handler);
	}, [breakpointValues]);

	useEffect(() => {
		if (!callback) return;

		const wasMatching = lastMatchesRef.current;
		lastMatchesRef.current = matches;

		if (!matches || wasMatching) {
			if (callbackTimeoutRef.current) clearTimeout(callbackTimeoutRef.current);
			callbackTimeoutRef.current = null;
			return;
		}

		callbackTimeoutRef.current = setTimeout(() => void callback(), CALLBACK_DEBOUNCE_MS);

		return (): void => {
			if (callbackTimeoutRef.current) clearTimeout(callbackTimeoutRef.current);
			callbackTimeoutRef.current = null;
		};
	}, [matches, callback]);

	return matches;
}
