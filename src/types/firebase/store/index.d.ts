namespace Firebase.Store {
	type State = {
		ready: boolean;
	};

	type Actions = {
		setReady: Callable.Sync.Argument<State["ready"], void>;
		initialize: Callable.Sync.Argument<void, void>;
		clearAll: Callable.Sync.Argument<void, void>;
	};

	type Slices = Slice.User.Slice;

	type Store = State & Actions & Slices;
}
