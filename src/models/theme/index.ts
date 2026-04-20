import { THEME_CONFIG } from "@/configs";
import { isTheme } from "@/utils";

const { EVENTS } = THEME_CONFIG;
const { TOGGLE, STORAGE } = EVENTS;

export class ThemeModel implements Theme.Contract {
	getThemeFromLocalStorage = (): Theme.Theme => (localStorage.getItem("theme") ?? "system") as Theme.Theme;

	shouldUseDarkMode = (theme: Theme.Theme): boolean => theme === "dark" || (theme === "system" && this.getSystemThemePreference());

	getThemeFromCustomEvent = (event: CustomEvent<Theme.Theme>): Theme.Theme => event.detail ?? this.getThemeFromLocalStorage();

	getSystemThemePreference = (): boolean => window.matchMedia("(prefers-color-scheme: dark)").matches;

	applyThemeToDOM = (isDark: boolean): void => {
		const html = document.documentElement;
		const theme = isDark ? "dark" : "light";
		const fn = isDark ? "add" : "remove";

		html.classList[fn]("dark");
		html.setAttribute("data-theme", theme);
	};

	getThemeFromStorageEvent = (event: StorageEvent): Theme.Theme => {
		if (event.key === "theme" && event.newValue && isTheme(event.newValue)) return event.newValue;
		return "system";
	};

	setupThemeManagement = ({ setTheme, initialize, onThemeChange, onSystemThemeChange }: Theme.Props.SetupThemeManagementProps): Callable.Sync.Void => {
		initialize();

		const cleanupSystemTheme = this.subscribeToSystemTheme((isDark: boolean): void => void onSystemThemeChange?.(isDark));

		const handleThemeToggle = (event: CustomEvent<Theme.Theme>): void => {
			const theme = this.getThemeFromCustomEvent(event);
			setTheme(theme);
			onThemeChange?.(theme);
		};

		const handleStorageChange = (event: StorageEvent): void => {
			const theme = this.getThemeFromStorageEvent(event);
			setTheme(theme);
			onThemeChange?.(theme);
		};

		window.addEventListener(TOGGLE, handleThemeToggle as EventListener);
		window.addEventListener(STORAGE, handleStorageChange as EventListener);

		const cleanupEventListeners = (): void => {
			window.removeEventListener(TOGGLE, handleThemeToggle as EventListener);
			window.removeEventListener(STORAGE, handleStorageChange as EventListener);
		};

		return (): void => {
			cleanupSystemTheme();
			cleanupEventListeners();
		};
	};

	applyTheme = (theme: Theme.Theme): void => {
		const isDark = this.shouldUseDarkMode(theme);
		this.applyThemeToDOM(isDark);
	};

	setTheme = (theme: Theme.Theme): void => {
		localStorage.setItem("theme", theme);
		this.applyTheme(theme);
	};

	initializeTheme = (): Theme.Theme => {
		const theme = this.getThemeFromLocalStorage();
		this.setTheme(theme);
		return theme;
	};

	subscribeToSystemTheme = (callback: Callable.Sync.Argument<boolean, void>): Callable.Sync.Void => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = (e: MediaQueryListEvent): void => callback(e.matches);
		mediaQuery.addEventListener("change", handler);
		return () => mediaQuery.removeEventListener("change", handler);
	};
}
