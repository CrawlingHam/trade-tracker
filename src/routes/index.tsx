import { Dashboard, Log, Navigationbar, NotFound } from "@/components";
import { Routes, Route, Navigate } from "react-router";
import { ROUTES } from "@/configs";
import { type JSX } from "react";

export function AppRoutes(): JSX.Element {
	return (
		<div className="flex flex-col h-full w-full bg-white dark:bg-black">
			<Navigationbar />

			<main className="h-full w-full mt-18 overflow-x-hidden p-2">
				<Routes>
					{/*--->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>---REDIRECTS---<<<<<<<<>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<---< */}
					<Route path={ROUTES.APP.HOME.BASE.ROUTE} element={<Navigate to={ROUTES.APP.DASHBOARD.BASE.ROUTE} replace />} />

					{/*--->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>---Routes---<<<<<<<<>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<---< */}
					<Route path={ROUTES.APP.DASHBOARD.BASE.ROUTE} element={<Dashboard />} />

					<Route path={ROUTES.APP.LOG.BASE.ROUTE} element={<Log />} />

					{/*--------------------------------------------------------------------------------------Wildcards ---------------------------------------------------------------------------------------*/}
					<Route
						path="*"
						element={
							<NotFound
								buttons={[
									{
										text: `Return to Main Page`,
										to: ROUTES.APP.HOME.BASE.ROUTE,
									},
								]}
								paragraph={{
									text: "Looks like you've ventured into an unknown virtual realm.",
								}}
							/>
						}
					/>
				</Routes>
			</main>
		</div>
	);
}

export default AppRoutes;
