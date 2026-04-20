import { FirebaseError } from "firebase/app";
import { isString } from "../guards";
import { MESSAGES } from "@/configs";
import { AxiosError } from "axios";

export function getErrorMessage<T>(error: T, filter?: string[] | readonly string[]): string {
	const hasFilter = filter != null && filter.length > 0;

	if (error instanceof AxiosError) {
		const data = error.response?.data as { error?: string; message?: string } | undefined;

		if (hasFilter) {
			const errorMessage = data?.message;
			if (isString(errorMessage) && filter.some((needle) => errorMessage.includes(needle))) return errorMessage;
			return MESSAGES.ERROR.DEFAULT;
		}

		const fromBody = data?.error ?? data?.message;
		if (isString(fromBody)) return fromBody;
		if (isString(error.message)) return error.message;
		return MESSAGES.ERROR.DEFAULT;
	}

	if (error instanceof Error || error instanceof FirebaseError) return error.message || MESSAGES.ERROR.DEFAULT;

	return MESSAGES.ERROR.DEFAULT;
}
