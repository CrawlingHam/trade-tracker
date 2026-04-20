import { useShallow } from "zustand/react/shallow";
import { logStore } from "@/stores";
import { useStore } from "zustand";

export function useLogTradeFormObject(): Pick<Pages.Log.Store.Store, "form" | "addDate" | "addSide" | "addPnl" | "addLot" | "addNotes" | "addEntry" | "addExit"> {
	return useStore(
		logStore,
		useShallow((s) => ({
			addNotes: s.addNotes,
			addEntry: s.addEntry,
			addExit: s.addExit,
			addDate: s.addDate,
			addSide: s.addSide,
			addPnl: s.addPnl,
			addLot: s.addLot,
			form: s.form,
		}))
	);
}
