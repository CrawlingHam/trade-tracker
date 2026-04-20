import type { Method as AxiosMethod, AxiosRequestConfig, AxiosInstance } from "axios";

declare global {
	namespace Requests.Axios {
		type Method = Extract<AxiosMethod, "GET" | "POST" | "PUT">;
		type MethodLowercase = Lowercase<Method>;

		type Options = Partial<Pick<AxiosRequestConfig, "headers" | "timeout" | "signal">> & {
			params?: Record<string, string> | URLSearchParams;
			body?: Record<string, string | string[]>;
		};

		type Config = {
			method: MethodLowercase;
			endpoint: string | URL;
			options?: Options;
		};

		type ConstructParameters = Config & {
			config: AxiosRequestConfig;
		};

		type Params<T extends MethodLowercase> = Parameters<AxiosInstance[T]>;

		type Props<T> = {
			errorList?: string[] | readonly string[];
			callback?: Callable.Argument<T, T | void>;
			throwError?: boolean;
			config: Config;
		};
	}
}

export {};
