import { firebaseStore } from "@/stores";
import { useStore } from "zustand";

export const useFirebaseInitializeAction = (): Firebase.Store.Store["initialize"] => useStore(firebaseStore, (s) => s.initialize);
export const useFirebaseSetReadyAction = (): Firebase.Store.Store["setReady"] => useStore(firebaseStore, (s) => s.setReady);

export const useFirebaseSetClientAction = (): Firebase.Store.Store["setClient"] => useStore(firebaseStore, (s) => s.setClient);

export const useFirebaseSubscribeAction = (): Firebase.Store.Store["subscribe"] => useStore(firebaseStore, (s) => s.subscribe);

export const useFirebaseInitializeAuthAction = (): Firebase.Store.Store["initializeAuth"] => useStore(firebaseStore, (s) => s.initializeAuth);

export const useFirebaseCreateAnonymousUserAction = (): Firebase.Store.Store["createAnonymousUser"] => useStore(firebaseStore, (s) => s.createAnonymousUser);

export const useFirebaseClearUserAction = (): Firebase.Store.Store["clearUser"] => useStore(firebaseStore, (s) => s.clearUser);

export const useFirebaseSetUserAction = (): Firebase.Store.Store["setUser"] => useStore(firebaseStore, (s) => s.setUser);

export const useFirebaseSetIsAnonymousAction = (): Firebase.Store.Store["setIsAnonymous"] => useStore(firebaseStore, (s) => s.setIsAnonymous);

export const useFirebaseSetCurrencyAction = (): Firebase.Store.Store["setCurrency"] => useStore(firebaseStore, (s) => s.setCurrency);
export const useFirebaseSetSymbolAction = (): Firebase.Store.Store["setSymbol"] => useStore(firebaseStore, (s) => s.setSymbol);

export const useFirebaseClearSettingsAction = (): Firebase.Store.Store["clearSettings"] => useStore(firebaseStore, (s) => s.clearSettings);

export const useFirebaseGetCurrencyAction = (): Firebase.Store.Store["getCurrency"] => useStore(firebaseStore, (s) => s.getCurrency);
export const useFirebaseGetSymbolAction = (): Firebase.Store.Store["getSymbol"] => useStore(firebaseStore, (s) => s.getSymbol);
