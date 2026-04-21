import { firebaseStore } from "@/stores";
import { useStore } from "zustand";

export const useFirebaseReadyState = (): Firebase.Store.Store["ready"] => useStore(firebaseStore, (s) => s.ready);

export const useFirebaseClientState = (): Firebase.Store.Store["client"] => useStore(firebaseStore, (s) => s.client);

export const useFirebaseClearAllState = (): Firebase.Store.Store["clearAll"] => useStore(firebaseStore, (s) => s.clearAll);

export const useFirebaseIsAnonymousState = (): Firebase.Store.Store["isAnonymous"] => useStore(firebaseStore, (s) => s.isAnonymous);

export const useFirebaseCurrencyState = (): Firebase.Store.Store["currency"] => useStore(firebaseStore, (s) => s.currency);
export const useFirebaseSymbolState = (): Firebase.Store.Store["symbol"] => useStore(firebaseStore, (s) => s.symbol);
export const useFirebaseGoalsState = (): Firebase.Store.Store["goals"] => useStore(firebaseStore, (s) => s.goals);

export const useUserState = (): Firebase.Store.Store["user"] => useStore(firebaseStore, (s) => s.user);
