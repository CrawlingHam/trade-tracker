import { BrowserRouter } from "react-router";
import { useAppBootstrap } from "@/hooks";
import { type JSX } from "react";
import AppRoutes from "@/routes";
import { Toaster } from "sonner";

function App(): JSX.Element {
	useAppBootstrap();

	return (
		<div className="flex flex-col h-screen w-screen">
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>

			<Toaster richColors duration={5000} />
		</div>
	);
}

export default App;
