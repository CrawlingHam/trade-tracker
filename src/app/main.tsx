import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./app.tsx";
import "@/styles/index.css";

document.title = import.meta.env.VITE_APP_TITLE as string;

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
