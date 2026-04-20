import { type JSX } from "react";
import History from "./history";
import Form from "./form";

function Log(): JSX.Element {
	return (
		<div className="flex w-full flex-col gap-5">
			<Form />
			<History />
		</div>
	);
}

export default Log;
