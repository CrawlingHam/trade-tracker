import { containsSymbol, sendFirebaseRequest } from "@/utils";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function getFirestoreUserSymbol(firestore: Firebase.Firestore): Promise<Trade.Symbol | undefined> {
	return await sendFirebaseRequest<Trade.Symbol | undefined>({
		callback: async (user: Firebase.User | null) => {
			if (!user) return;

			const docRef = doc(firestore, "trade-tracker", user.uid);

			const snapshot = await getDoc(docRef);
			if (!snapshot.exists()) return;

			const data = snapshot.data() as Firebase.Document<true>;
			return containsSymbol<true>(data) ? data.symbol : undefined;
		},
	});
}

export async function updateFirestoreUserSymbol(firestore: Firebase.Firestore, symbol: Trade.Symbol): Promise<void> {
	return await sendFirebaseRequest<void>({
		callback: async (user: Firebase.User | null) => {
			if (!user) return;

			const docRef = doc(firestore, "trade-tracker", user.uid);
			await setDoc(docRef, { symbol }, { merge: true });
		},
	});
}
