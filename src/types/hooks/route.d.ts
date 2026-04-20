namespace Hooks {
	namespace Props {
		type UseRoute = {
			route: App.Pages.Route | undefined;
			pathname: Location["pathname"];
			isAuthorized: boolean;
		};
	}
}
