import { APP_ROUTES } from "./app.routes";

const defaultLevel: App.Pages.AuthorizationLevel = "all";

const baseLevels: Record<App.Pages.Route, App.Pages.AuthorizationLevel> = Object.fromEntries(
	(Object.values(APP_ROUTES) as Array<{ BASE: { ROUTE: App.Pages.Route } }>).map((group) => [group.BASE.ROUTE, defaultLevel])
) as Record<App.Pages.Route, App.Pages.AuthorizationLevel>;

export const AUTHORIZATION_LEVELS: Record<App.Pages.Route, App.Pages.AuthorizationLevel> = {
	...baseLevels,
	// [APP_ROUTES.LIBRARY.BASE.ROUTE]: "authenticated", Example
};

/**
 * Route-specific overrides. Used when base-route level is not enough.
 * @example Sign-out requires authentication.
 * ```ts
 * {
 *   [APP_ROUTES.AUTH.BASE.ROUTE]: "unauthenticated",
 *   [APP_ROUTES.AUTH.SIGNOUT.ROUTE]: "authenticated",
 * }
 * ```
 */
export const AUTHORIZATION_ROUTE_OVERRIDES: Partial<Record<App.Pages.Route, App.Pages.AuthorizationLevel>> = {
	// [`${APP_ROUTES.AUTH.BASE.ROUTE}/${APP_ROUTES.AUTH.SIGNOUT.ROUTE}` as App.Pages.Route]: "authenticated", Example
};
