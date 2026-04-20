import { appStore } from "@/stores";
import { useStore } from "zustand";

export const useAppSetReadyAction = (): App.Store.Store["setReady"] => useStore(appStore, (s) => s.setReady);
