import { containsCurrency, sendFirebaseRequest } from "@/utils";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function getFirestoreUserCurrency(firestore: Firebase.Firestore): Promise<string | undefined> {
	return await sendFirebaseRequest<string | undefined>({
		callback: async (user: Firebase.User | null) => {
			if (!user) return;

			const docRef = doc(firestore, "trade-tracker", user.uid);

			const snapshot = await getDoc(docRef);
			if (!snapshot.exists()) return;

			const data = snapshot.data() as Firebase.Document<true>;
			return containsCurrency<true>(data) ? data.currency : undefined;
		},
	});
}

export async function updateFirestoreUserCurrency(firestore: Firebase.Firestore, currency: string): Promise<void> {
	return await sendFirebaseRequest<void>({
		callback: async (user: Firebase.User | null) => {
			if (!user) return;

			const docRef = doc(firestore, "trade-tracker", user.uid);
			await setDoc(docRef, { currency }, { merge: true });
		},
	});
}
