namespace Firebase.Slice.User.Client {
	type State = {
		firestore?: Firestore;
		client?: Client;
		auth?: Auth;
	};

	type Actions = {
		subscribe: <T>(callback: (user: Slice.User.State["user"]) => Promise<T>) => Unsubscribe;
		setFirestore: Callable.Sync.Argument<State["firestore"], void>;
		setClient: Callable.Sync.Argument<State["client"], void>;
		initializeAuth: Callable.Sync.Argument<void, void>;
		clearClient: Callable.Sync.Argument<void, void>;
	};

	type Slice = State & Actions;
}
