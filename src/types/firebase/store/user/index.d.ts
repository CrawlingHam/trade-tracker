namespace Firebase.Slice.User {
	type State = {
		isAnonymous: boolean;
		user: User | null;
	};

	type Actions = {
		setIsAnonymous: Callable.Sync.Argument<State["isAnonymous"], void>;
		createAnonymousUser: Callable.Async.Argument<void, void>;
		setUser: Callable.Sync.Argument<State["user"], void>;
		clearUser: Callable.Sync.Argument<void, void>;
	};

	type Slice = State & Actions & Client.Slice & Settings.Slice;
}
