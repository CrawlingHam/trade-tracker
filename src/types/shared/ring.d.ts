namespace Shared.Ring {
	type Props = Required<Pick<React.SVGProps<SVGCircleElement>, "stroke" | "color">> & {
		progress: number; // Progress of the ring between values 0 and 1
		center: Alias.Child;
		label: string;
		size: number;
		sub: string;
	};
}
