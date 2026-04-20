import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from "vite";
import { validateEnvironmentVariables } from "./scripts";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const envDir = resolve(__dirname);
	const env = loadEnv(mode, envDir);

	validateEnvironmentVariables(env);

	return {
		envDir,
		plugins: [react(), tailwindcss()],
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src"),
			},
		},
		build: {
			chunkSizeWarningLimit: 500,
			cssCodeSplit: false,
			assetsDir: "assets",
			minify: "esbuild",
			target: "esnext",
			outDir: "dist",
			rollupOptions: {
				output: {
					assetFileNames: "assets/[name][extname]",
					entryFileNames: "assets/[name].js",
					chunkFileNames: "assets/[name].js",
				},
			},
		},
		server: {
			port: Number(env.VITE_APP_PORT),
			host: true,
		},
		preview: {
			port: Number(env.VITE_APP_PORT),
			host: true,
		},
	} satisfies UserConfig;
});
