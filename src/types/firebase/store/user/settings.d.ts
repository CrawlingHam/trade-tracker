namespace Firebase.Slice.User.Settings {
	type State = Document<true>;

	type Actions = {
		setGoals: Callable.Async.Argument<Partial<Trade.Goals>, void>;
		setCurrency: Callable.Async.Argument<State["currency"], void>;
		getCurrency: Callable.Async.Argument<void, State["currency"]>;
		setSymbol: Callable.Async.Argument<State["symbol"], void>;
		getSymbol: Callable.Async.Argument<void, State["symbol"]>;
		getGoals: Callable.Async.Argument<void, State["goals"]>;
		clearSettings: Callable.Sync.Argument<void, void>;
	};

	type Slice = State & Actions;
}
