import { DEFAULT_BOOTSTRAP_STEPS_STATE } from "@/configs";
import { useCallback, useMemo, useState } from "react";
import { useUserSubscriber } from "./subscriber";
import { useUserSettings } from "./settings";

/**
 * Starts user store auth subscription when firebase is ready. Sets user store client from firebase
 * and signals app store when user is ready.
 * @param firebaseReady - Whether firebase bootstrap is ready (run this only after firebase is ready).
 */
export function useUserBootstrap(firebaseReady: boolean = false): Firebase.Store.Store["ready"] {
	const [steps, setSteps] = useState<Firebase.BootstrapStepsState>(DEFAULT_BOOTSTRAP_STEPS_STATE);

	const markStepDone = useCallback<Callable.Sync.Argument<Firebase.BootstrapStep, void>>((step) => {
		setSteps((prev) => (prev[step] ? prev : { ...prev, [step]: true }));
	}, []);

	const markAuthDone = useCallback<Callable.Sync.Argument<void, void>>(() => markStepDone("auth"), [markStepDone]);
	const markSettingsDone = useCallback<Callable.Sync.Argument<void, void>>(() => markStepDone("settings"), [markStepDone]);

	useUserSubscriber(firebaseReady, markAuthDone);
	useUserSettings(firebaseReady, markSettingsDone);

	return useMemo<Firebase.Store.Store["ready"]>(() => Object.values(steps).every(Boolean), [steps]);
}
