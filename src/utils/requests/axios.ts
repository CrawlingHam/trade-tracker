import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { getErrorMessage } from "./error.message";
import { IS_PRODUCTION } from "@/configs";
import { isString } from "../guards";

function constructAxiosParameters({ endpoint, method, options, config }: Requests.Axios.ConstructParameters): Requests.Axios.Params<typeof method> {
	const args: Requests.Axios.Params<typeof method> = [isString(endpoint) ? endpoint : endpoint.toString()];
	if (["post", "put"].includes(method.toLowerCase())) args.push(options?.body);
	args.push(config);
	return args;
}

export async function sendAxiosRequest<T>({ config, callback, errorList = [], throwError = true }: Requests.Axios.Props<T>): Promise<T | undefined> {
	const { endpoint, method, options } = config;

	try {
		const config: AxiosRequestConfig = {
			timeout: options?.timeout ?? 60 * 1000, // 60 seconds
			headers: options?.headers,
			params: options?.params,
			signal: options?.signal,
			withCredentials: true,
			data: options?.body,
		};

		const args = constructAxiosParameters({ endpoint, method, options, config });
		const response: AxiosResponse<T> = await axios[method]<T>(...(args as [string, ...unknown[]]));
		return (await callback?.(response.data)) ?? response.data;
	} catch (error: unknown) {
		const errorMessage = getErrorMessage(error, errorList);

		if (!IS_PRODUCTION) console.error(`[UTILS::REQUEST::SEND_AXIOS_REQUEST] Request failed: ${errorMessage}`);
		if (throwError) throw new Error(errorMessage);
	}
}
