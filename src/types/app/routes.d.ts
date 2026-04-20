import { APP_ROUTES } from "@/configs/routes/app.routes";

declare global {
	type StripLeadingSlash<T extends string> = T extends `/${infer R}` ? R : T;

	namespace App.Pages {
		type AuthorizationLevel = "authenticated" | "unauthenticated" | "all";

		type Sections = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
		type SectionRoutes<T extends Sections = Sections> = T[keyof T];

		namespace Titles {
			type Projection = SectionRoutes<typeof APP_ROUTES.PROJECTION>["TITLE"];
			type Dashboard = SectionRoutes<typeof APP_ROUTES.DASHBOARD>["TITLE"];
			type Home = SectionRoutes<typeof APP_ROUTES.HOME>["TITLE"];
			type Log = SectionRoutes<typeof APP_ROUTES.LOG>["TITLE"];
		}

		namespace Routes {
			type Projection = SectionRoutes<typeof APP_ROUTES.PROJECTION>["ROUTE"];
			type Dashboard = SectionRoutes<typeof APP_ROUTES.DASHBOARD>["ROUTE"];
			type Home = SectionRoutes<typeof APP_ROUTES.HOME>["ROUTE"];
			type Log = SectionRoutes<typeof APP_ROUTES.LOG>["ROUTE"];
		}

		type Title = SectionRoutes["TITLE"];
		type Route = SectionRoutes["ROUTE"];
		type Wildcard = `${Exclude<Route, Routes.Home>}/*`;
	}
}

export {};
