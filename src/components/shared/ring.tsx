import { type JSX } from "react";

function Ring({ size, stroke, color, progress, center, label, sub }: Shared.Ring.Props): JSX.Element {
	const strokeNum = Number(stroke);

	const radius = (size - strokeNum) / 2;
	const circ = 2 * Math.PI * radius;

	const offset = circ * (1 - Math.min(Math.max(progress > 0 ? progress : 0.01, 0), 1));

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
			<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
				<circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--bg2)" strokeWidth={stroke} />

				<circle
					style={{ transition: "stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1)" }}
					transform={`rotate(-90 ${size / 2} ${size / 2})`}
					strokeDashoffset={offset}
					strokeDasharray={circ}
					strokeLinecap="round"
					strokeWidth={stroke}
					stroke={color}
					cx={size / 2}
					cy={size / 2}
					fill="none"
					r={radius}
				/>

				<foreignObject x={strokeNum} y={strokeNum} width={size - strokeNum * 2} height={size - strokeNum * 2}>
					<div
						style={{
							justifyContent: "center",
							flexDirection: "column",
							alignItems: "center",
							display: "flex",
							height: "100%",
							width: "100%",
							gap: 2,
						}}
					>
						{center}
					</div>
				</foreignObject>
			</svg>

			<span style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "var(--text2)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
			{sub && <span style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--font-mono)" }}>{sub}</span>}
		</div>
	);
}

export default Ring;
