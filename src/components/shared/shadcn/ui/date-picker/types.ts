export type DatePickerFieldProps = {
	onChange: (isoDate: string) => void;
	classNames?: {
		trigger?: string;
		content?: {
			container?: string;
			calendar?: string;
		};
	};
	value: string;
};
