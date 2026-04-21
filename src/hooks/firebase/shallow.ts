import { useShallow } from "zustand/react/shallow";
import { firebaseStore } from "@/stores";
import { useStore } from "zustand";

export const useFirebaseCurrencyObject = (): Pick<Firebase.Slice.User.Settings.Slice, "currency" | "setCurrency"> =>
	useStore(
		firebaseStore,
		useShallow((s) => ({
			currency: s.currency,
			setCurrency: s.setCurrency,
		}))
	);

export function useFirebaseGoalsObject(): Pick<Firebase.Store.Store, "goals" | "setGoals"> {
	return useStore(
		firebaseStore,
		useShallow((s) => ({
			setGoals: s.setGoals,
			goals: s.goals,
		}))
	);
}
