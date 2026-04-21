import type { Firestore as FirebaseFirestore, FieldValue as FirebaseFieldValue, DocumentData as FirebaseDocumentData } from "firebase/firestore";
import type { User as FirebaseUser, Auth as FirebaseAuth, Unsubscribe as FirebaseUnsubscribe } from "firebase/auth";
import type { FirebaseApp } from "firebase/app";

declare global {
	namespace Firebase {
		type DocumentData = FirebaseDocumentData;
		type Unsubscribe = FirebaseUnsubscribe;
		type FieldValue = FirebaseFieldValue;
		type Firestore = FirebaseFirestore;
		type Client = FirebaseApp;
		type User = FirebaseUser;
		type Auth = FirebaseAuth;

		type Services = {
			firestore: Firestore;
			client: Client;
		};

		type BootstrapStep = "auth" | "settings";
		type BootstrapStepsState = Record<BootstrapStep, boolean>;

		/**
		 * @description Dynamic document type based on the boolean parameter
		 * @template {T} - Actual type if true, otherwise FieldValue
		 */
		type Document<T extends boolean = true> = DocumentData & {
			symbol?: T extends true ? Trade.Symbol : FieldValue;
			currency?: T extends true ? string : FieldValue;
			goals?: T extends true ? Trade.Goals : FieldValue;
		};
	}
}

export {};
