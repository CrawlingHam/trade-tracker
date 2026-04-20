export * from "./navigationbar";
export * from "./firebase";
export * from "./messages";
export * from "./routes";
export * from "./theme";
export * from "./pairs";
export * from "./log";

export const IS_PRODUCTION = import.meta.env.ENVIRONMENT === "production";

export const BREAKPOINTS = {
	"2XL": 1536,
	XL: 1280,
	LG: 1024,
	MD: 768,
	SM: 640,
	XS: 400,
	XXS: 320,
} as const;
