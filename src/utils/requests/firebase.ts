import { getErrorMessage } from "./error.message";
import { IS_PRODUCTION } from "@/configs";
import { getAuth } from "firebase/auth";

export async function sendFirebaseRequest<T>({ callback, requireUser, throwError, errorList }: Requests.Firebase.Props<T>): Promise<T | undefined> {
	const user = getAuth().currentUser;
	if (requireUser && !user) return;

	try {
		return (await callback?.(user)) ?? undefined;
	} catch (error) {
		const errorMessage = getErrorMessage(error, errorList);

		if (!IS_PRODUCTION) console.error(`[UTILS::REQUEST::SEND_FIREBASE_REQUEST] Request failed: ${errorMessage}`);
		if (throwError) throw new Error(errorMessage);
	}
}
