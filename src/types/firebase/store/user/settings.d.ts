namespace Firebase.Slice.User.Settings {
	type State = {
		symbol?: Trade.Symbol;
		currency?: string;
	};

	type Actions = {
		setCurrency: Callable.Async.Argument<State["currency"], void>;
		getCurrency: Callable.Async.Argument<void, State["currency"]>;
		setSymbol: Callable.Async.Argument<State["symbol"], void>;
		getSymbol: Callable.Async.Argument<void, State["symbol"]>;
		clearSettings: Callable.Sync.Argument<void, void>;
	};

	type Slice = State & Actions;
}
