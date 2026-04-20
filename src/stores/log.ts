import { create } from "zustand";

const state: Pages.Log.Store.State = {
	form: undefined,
};

export const logStore = create<Pages.Log.Store.Store>((set) => ({
	...state,

	addDate: (date: Pages.Log.Form["date"]): ReturnType<Pages.Log.Store.Actions["addDate"]> => set((state) => ({ form: { ...state.form, date } })),
	addSide: (side: Pages.Log.Form["side"]): ReturnType<Pages.Log.Store.Actions["addSide"]> => set((state) => ({ form: { ...state.form, side } })),
	addPnl: (pnl: Pages.Log.Form["pnl"]): ReturnType<Pages.Log.Store.Actions["addPnl"]> => set((state) => ({ form: { ...state.form, pnl } })),
	addLot: (lot: Pages.Log.Form["lot"]): ReturnType<Pages.Log.Store.Actions["addLot"]> => set((state) => ({ form: { ...state.form, lot } })),
	addNotes: (notes: Pages.Log.Form["notes"]): ReturnType<Pages.Log.Store.Actions["addNotes"]> => set((state) => ({ form: { ...state.form, notes } })),
	addEntry: (entry: Pages.Log.Form["entry"]): ReturnType<Pages.Log.Store.Actions["addEntry"]> => set((state) => ({ form: { ...state.form, entry } })),
	addExit: (exit: Pages.Log.Form["exit"]): ReturnType<Pages.Log.Store.Actions["addExit"]> => set((state) => ({ form: { ...state.form, exit } })),
}));
