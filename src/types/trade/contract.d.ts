namespace Trade {
	interface Contract {
		getAccount: Callable.Async.Argument<void, Account | undefined>;
		getTrades: Callable.Async.Argument<void, PositionTrade[] | undefined>;
		getPairs: Callable.Async.Argument<void, Pairs | undefined>;
	}
}
