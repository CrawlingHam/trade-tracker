import { useFirebaseIsAnonymousState, useFirebaseReadyState } from "./firebase";
import { useLocation } from "react-router";
import { ROUTES } from "@/configs";
import { useMemo } from "react";
import { text } from "@/utils";

const BASE_ROUTES = Object.values(ROUTES.APP).map((group) => group.BASE.ROUTE);

/**
 * Current pathname, derived route, and whether the user is authorized for the current route.
 * Router is the source of truth for location; authorization is derived from ROUTES.AUTHORIZATION and user state.
 */
export function useRoute(): Hooks.Props.UseRoute {
	const isAnonymous = useFirebaseIsAnonymousState();
	const isReady = useFirebaseReadyState();
	const isLoading = !isReady;

	const { pathname } = useLocation();

	const pathnameArray = pathname.split("/");
	const currentBaseRoute = (!pathnameArray[1] ? ROUTES.APP.HOME.BASE.ROUTE : `/${pathnameArray[1]}`).toLowerCase() as App.Pages.Route;

	const route = useMemo<App.Pages.Route | undefined>((): App.Pages.Route | undefined => {
		if (isLoading) return;

		const baseRoute = currentBaseRoute;

		if (!BASE_ROUTES.includes(baseRoute)) return;

		const [groupKey, group] = Object.entries(ROUTES.APP).find(([, group]) => group.BASE.ROUTE === baseRoute) ?? [];
		if (!groupKey || !group) return;

		const subRoute = text((!pathnameArray[2] ? "base" : pathnameArray[2]).toUpperCase())
			.removePatterns(["-"])
			.toString() as keyof typeof group;
		if (!subRoute) return;

		const subRouteConfig = group[subRoute];
		if (!subRouteConfig) return;

		const content = baseRoute === subRouteConfig.ROUTE ? baseRoute : `${baseRoute}/${subRouteConfig.ROUTE}`;
		const route = text(content).removePatterns([], true).toString() as App.Pages.Route;
		if (!route) return;

		return route;
	}, [pathnameArray, currentBaseRoute, isLoading]);

	const isAuthorized = useMemo<boolean>((): boolean => {
		if (isLoading || route === undefined) return true;

		const baseRoute = currentBaseRoute;
		const level = ROUTES.AUTHORIZATION_ROUTE_OVERRIDES[route] ?? ROUTES.AUTHORIZATION[baseRoute];

		if (level === "all") return true;

		const isAuthenticated = !isAnonymous;

		if (level === "authenticated") return isAuthenticated;
		if (level === "unauthenticated") return !isAuthenticated;

		return true;
	}, [currentBaseRoute, isLoading, route, isAnonymous]);

	return useMemo<Hooks.Props.UseRoute>((): Hooks.Props.UseRoute => ({ isAuthorized, pathname, route }), [isAuthorized, pathname, route]);
}
