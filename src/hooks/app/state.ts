import { appStore } from "@/stores";
import { useStore } from "zustand";

export const useAppIsLoading = (): boolean => useStore(appStore, (s) => !s.ready);
