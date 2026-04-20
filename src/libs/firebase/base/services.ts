import { type FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export function initializeFirebaseServices(credentials: FirebaseOptions): Firebase.Services {
	const client = initializeApp(credentials);

	return {
		firestore: getFirestore(client),
		client,
	};
}
