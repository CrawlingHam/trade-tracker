namespace Theme {
	type Theme = "light" | "dark" | "system";

	interface Object {
		setTheme: Callable.Sync.Argument<Theme, void>;
		theme: Theme;
	}
}
