import LinkButton from "./button";
import { type JSX } from "react";

function NotFound({ paragraph, buttons }: Pages.NotFound.Props.NotFound): JSX.Element {
	return (
		<div className="flex items-center h-full w-full">
			<div className="w-full space-y-8 text-center">
				<div className="space-y-3">
					<h1 className="text-6xl font-extrabold tracking-tight text-(--text) animate-bounce">404</h1>

					<p className="text-lg text-slate-600 dark:text-slate-300">
						{paragraph.text}
						{paragraph.span && (
							<span className="block font-mono px-2 py-1 mt-2 rounded bg-slate-200 dark:bg-slate-900 text-slate-900 dark:text-slate-200">
								{paragraph.span.text}
								{paragraph.span.example && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">example: {paragraph.span.example}</p>}
							</span>
						)}
					</p>
				</div>

				<div className="flex justify-center items-center space-x-3">
					<div className="flex flex-col gap-2">
						{buttons.map(
							(button: Pages.NotFound.Button404): JSX.Element => (
								<LinkButton key={button.to} to={button.to} text={button.text} variant="secondary" />
							)
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default NotFound;
