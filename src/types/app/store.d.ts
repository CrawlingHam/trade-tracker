namespace App.Store {
	interface State {
		ready: boolean;
	}

	interface Actions {
		setReady: Callable.Sync.Argument<boolean, void>;
	}

	type Store = State & Actions;
}
