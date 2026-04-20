namespace Theme.Store {
	type State = Pick<Theme.Object, "theme"> & {
		ready: boolean;
	};

	type Actions = Pick<Theme.Object, "setTheme"> & {
		shouldUseDarkMode: Callable.Sync.Argument<Theme, boolean>;
		setReady: Callable.Sync.Argument<boolean, void>;
		initialize: Callable.Sync.Void;
	};

	type Store = State & Actions;
}
