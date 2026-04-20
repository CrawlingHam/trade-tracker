import { ENVIRONMENT_VARIABLES } from "../configs";

export function validateEnvironmentVariables(environment) {
	for (const ENV_VAR of ENVIRONMENT_VARIABLES) {
		if (!environment) continue;

		const variable = `VITE_${ENV_VAR}`;

		if (!environment[variable]) {
			console.error(`❌ '${variable}' is not set`);
			throw new Error(`Internal error`);
		}
	}
}
