import { useMobile } from "@/hooks";
import { type JSX } from "react";
import Theme from "../theme";
import Items from "./items";
import Menu from "./menu";

function Content(): JSX.Element | null {
	const isMobile = useMobile();

	return (
		<>
			{isMobile ? <Menu /> : <Items />}
			<Theme />
		</>
	);
}

export default Content;
