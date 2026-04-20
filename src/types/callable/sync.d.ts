namespace Callable.Sync {
	type Boolean = () => boolean;
	type Number = () => number;

	type Generic<T> = () => T;

	type Void = () => void;

	type Argument<A, R> = (arg: A) => R;
}
