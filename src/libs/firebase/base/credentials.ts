import type { FirebaseOptions } from "firebase/app";

export function getFirebaseClientCredentials(): FirebaseOptions {
	return {
		messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID as string | undefined,
		storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
		authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
		projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
		apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
		appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
	};
}
