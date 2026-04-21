import { doc, getDoc, setDoc } from "firebase/firestore";
import { isObject, sendFirebaseRequest } from "@/utils";

export async function getFirestoreUserGoals(firestore: Firebase.Firestore): Promise<Trade.Goals | undefined> {
	return await sendFirebaseRequest<Trade.Goals | undefined>({
		callback: async (user: Firebase.User | null) => {
			if (!user) return;

			const docRef = doc(firestore, "trade-tracker", user.uid);

			const snapshot = await getDoc(docRef);
			if (!snapshot.exists()) return;

			const data = snapshot.data() as Firebase.Document<true>;
			return isObject(data.goals) ? data.goals : undefined;
		},
	});
}

export async function updateFirestoreUserGoals(firestore: Firebase.Firestore, goals: Partial<Trade.Goals>): Promise<void> {
	return await sendFirebaseRequest<void>({
		callback: async (user: Firebase.User | null) => {
			if (!user) return;

			const updates = Object.fromEntries(Object.entries(goals).filter(([, value]) => value !== undefined)) as Partial<Trade.Goals>;
			if (Object.keys(updates).length === 0) return;

			const docRef = doc(firestore, "trade-tracker", user.uid);
			await setDoc(docRef, { goals: updates }, { merge: true });
		},
	});
}
