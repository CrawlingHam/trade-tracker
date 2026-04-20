import { useShallow } from "zustand/react/shallow";
import { navigationbarStore } from "@/stores";
import { useStore } from "zustand";

export function useNavigationbarTabObject(): Pick<Navigationbar.Store.Store, "tab" | "setTab"> {
	return useStore(
		navigationbarStore,
		useShallow((s) => ({
			tab: s.tab,
			setTab: s.setTab,
		}))
	);
}
