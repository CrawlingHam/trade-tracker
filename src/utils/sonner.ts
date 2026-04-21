import { toast } from "sonner";

const toastFunctions: Sonner.Functions = {
	success: toast.success,
	warning: toast.warning,
	error: toast.error,
	info: toast.info,
};

export const showToast = ({ type, title = "", options, condition = true }: Sonner.ShowToast.Props): void => {
	if (!condition) return;

	const { description, duration = 5000 } = options || {};

	switch (type) {
		case "success":
			toastFunctions.success(title, { description, duration });
			break;
		case "error":
			toastFunctions.error(title, { description, duration });
			break;
		case "info":
			toastFunctions.info(title, { description, duration });
			break;
		case "warning":
			toastFunctions.warning(title, { description, duration });
			break;
		default:
			break;
	}
};
