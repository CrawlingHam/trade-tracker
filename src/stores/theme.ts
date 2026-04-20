import { ThemeModel } from "@/models";
import { create } from "zustand";

const themeModel = new ThemeModel();

const state: Theme.Store.State = {
	theme: "system",
	ready: false,
};

export const themeStore = create<Theme.Store.Store>((set, get) => ({
	...state,

	setReady: (ready: boolean): ReturnType<Theme.Store.Actions["setReady"]> => set({ ready }),

	shouldUseDarkMode: (theme: Theme.Theme): boolean => themeModel.shouldUseDarkMode(theme),

	setTheme: (theme: Theme.Theme): ReturnType<Theme.Store.Actions["setTheme"]> => {
		themeModel.setTheme(theme);
		set({ theme });
	},

	initialize: (): ReturnType<Theme.Store.Actions["initialize"]> => {
		themeModel.setupThemeManagement({
			setTheme: get().setTheme,
			initialize: (): ReturnType<Theme.Props.SetupThemeManagementProps["initialize"]> => {
				const theme = themeModel.getThemeFromLocalStorage();
				themeModel.applyTheme(theme);
				set({ theme, ready: true });
			},
			onThemeChange: (newTheme: Theme.Theme): ReturnType<NonNullable<Theme.Props.SetupThemeManagementProps["onThemeChange"]>> => {
				const isDark = themeModel.shouldUseDarkMode(newTheme);
				document.documentElement.classList.toggle("dark", isDark);
			},
			onSystemThemeChange: (isDark: boolean): ReturnType<NonNullable<Theme.Props.SetupThemeManagementProps["onSystemThemeChange"]>> => {
				if (get().theme === "system") themeModel.applyThemeToDOM(isDark);
			},
		});
	},
}));
