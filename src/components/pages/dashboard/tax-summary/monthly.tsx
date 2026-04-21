import { DASHBOARD_CONFIG } from "@/configs";
import { type JSX } from "react";

const { TAX_SUMMARY_HEADERS } = DASHBOARD_CONFIG;

function MonthlySummary({ items, formatSignedMoney }: Pages.Dashboard.Props.MonthlySummary): JSX.Element {
	return (
		<div className="mb-3 overflow-x-auto">
			<p className="mb-2 text-[10px] uppercase tracking-[0.08em] text-(--text3)">Monthly (realized)</p>

			<table className="w-full border-collapse text-xs">
				<thead>
					<tr className="border-b border-(--border)">
						{TAX_SUMMARY_HEADERS.map(
							({ key, label }): JSX.Element => (
								<th key={key} className={`px-2 py-1.5 text-(--text3) ${key === "label" ? "text-left" : "text-right"}`}>
									{label}
								</th>
							)
						)}
					</tr>
				</thead>

				<tbody>
					{items.slice(-6).map(
						(row): JSX.Element => (
							<tr key={`m-${row.label}`} className="border-b border-(--border)">
								<td className="px-2 py-1.5">{row.label}</td>
								<td className="px-2 py-1.5 text-right">{formatSignedMoney(row.pnl)}</td>
								<td className="px-2 py-1.5 text-right">{formatSignedMoney(row.commission)}</td>
								<td className="px-2 py-1.5 text-right">{formatSignedMoney(row.fee)}</td>
								<td className="px-2 py-1.5 text-right">{formatSignedMoney(row.swap)}</td>
								<td className="px-2 py-1.5 text-right">{formatSignedMoney(row.net)}</td>
							</tr>
						)
					)}

					{items.length === 0 && (
						<tr>
							<td className="px-2 py-2 text-(--text3)" colSpan={TAX_SUMMARY_HEADERS.length}>
								No closed trades yet.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

export default MonthlySummary;
