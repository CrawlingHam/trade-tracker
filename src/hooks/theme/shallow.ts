import { useShallow } from "zustand/react/shallow";
import { themeStore } from "@/stores";
import { useStore } from "zustand";

export function useThemeInitialization(): Pick<Theme.Store.Store, "initialize" | "ready"> {
	return useStore(
		themeStore,
		useShallow((s) => ({
			initialize: s.initialize,
			ready: s.ready,
		}))
	);
}

export function useThemeObject(): Pick<Theme.Store.Store, "theme" | "setTheme"> {
	return useStore(
		themeStore,
		useShallow((s) => ({
			theme: s.theme,
			setTheme: s.setTheme,
		}))
	);
}
