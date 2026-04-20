import type { User as FirebaseUser } from "firebase/auth";

declare global {
	namespace Requests.Firebase {
		type Props<T> = {
			callback?: Callable.Argument<FirebaseUser | null, T | void>;
			errorList?: string[] | readonly string[];
			requireUser?: boolean;
			throwError?: boolean;
		};
	}
}

export {};
