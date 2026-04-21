namespace Sonner {
	type Options = {
		description?: string;
		duration?: number;
	};

	type ToastType = Alias.Status | "info" | "warning";

	type Function = (message: string, options?: Options) => void;

	type Functions = {
		warning: Function;
		success: Function;
		error: Function;
		info: Function;
	};

	namespace ShowToast {
		type Props = {
			condition?: boolean;
			options?: Options;
			type: ToastType;
			title?: string;
		};
	}
}
