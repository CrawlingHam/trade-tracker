namespace Callable.Async {
	type Argument<T, R> = (...args: T[]) => Promise<R>;
}
