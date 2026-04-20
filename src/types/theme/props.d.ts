namespace Theme.Props {
	type SetupThemeManagementProps = Pick<Theme.Store.Actions, "setTheme" | "initialize"> & {
		onSystemThemeChange?: Callable.Sync.Argument<boolean, void>;
		onThemeChange?: Callable.Sync.Argument<Theme, void>;
	};
}
