import { defineConfig, globalIgnores } from "eslint/config";
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
	globalIgnores(["dist"]),

	// Type-checked lint for app source
	{
		extends: [js.configs.recommended, tseslint.configs.recommended, tseslint.configs.recommendedTypeChecked],
		files: ["src/**/*.{ts,tsx}"],
		plugins: {
			"react-refresh": reactRefresh,
			"react-hooks": reactHooks,
		},
		languageOptions: {
			ecmaVersion: 2020,
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				project: ["./tsconfig.app.json"],
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
		},
	},

	// Non-type-checked lint for config files outside src
	{
		extends: [js.configs.recommended, tseslint.configs.recommended],
		files: ["**/*.{ts,tsx}"],
		ignores: ["src/**"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: { ...globals.browser, ...globals.node },
		},
	},
]);
