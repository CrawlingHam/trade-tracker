import { AUTHORIZATION_LEVELS, AUTHORIZATION_ROUTE_OVERRIDES } from "./authorization";
import { APP_ROUTES } from "./app.routes";
import { API_ROUTES } from "./api.routes";

export const ROUTES = {
	AUTHORIZATION: AUTHORIZATION_LEVELS,
	AUTHORIZATION_ROUTE_OVERRIDES,
	APP: APP_ROUTES,
	API: API_ROUTES,
} as const;
