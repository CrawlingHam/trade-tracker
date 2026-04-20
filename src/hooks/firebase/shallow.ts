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
