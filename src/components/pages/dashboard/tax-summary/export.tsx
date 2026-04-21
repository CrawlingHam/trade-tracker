import { Button, Popover, PopoverContent, PopoverTrigger } from "@/components/shared";
import { useMemo, useState, type JSX } from "react";
import autoTable from "jspdf-autotable";
import { escapeCsv } from "@/utils";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";

const EXPORT_BUTTONS = ["CSV", "PDF"] as const;

function ExportTaxSummary({ monthly, yearly, formatSignedMoney, currency }: Pages.Dashboard.Props.ExportTaxSummary): JSX.Element {
	const [open, setOpen] = useState<boolean>(false);

	const exportRows = useMemo(
		() => [
			...monthly.map((row) => ({ periodType: "Monthly", period: row.label, ...row })),
			...yearly.map((row) => ({ periodType: "Yearly", period: row.label, ...row })),
		],
		[monthly, yearly]
	);

	const handleExportCsv = (): void => {
		const headers = ["Type", "Period", "PnL", "Commission", "Fee", "Swap", "Net", "Currency"];
		const lines = [
			headers.join(","),
			...exportRows.map((row) =>
				[
					escapeCsv(row.periodType),
					escapeCsv(row.period),
					escapeCsv(formatSignedMoney(row.pnl)),
					escapeCsv(formatSignedMoney(row.commission)),
					escapeCsv(formatSignedMoney(row.fee)),
					escapeCsv(formatSignedMoney(row.swap)),
					escapeCsv(formatSignedMoney(row.net)),
					escapeCsv(currency),
				].join(",")
			),
		];

		const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
		const timestamp = new Date().toISOString().slice(0, 10);
		saveAs(blob, `tax-summary-${timestamp}.csv`);
	};

	const handleExportPdf = (): void => {
		const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
		const timestamp = new Date().toISOString().slice(0, 10);

		doc.setFontSize(14);
		doc.text("Tax Summary", 40, 40);
		doc.setFontSize(10);
		doc.text(`Currency: ${currency} | Generated: ${new Date().toLocaleString()}`, 40, 58);

		autoTable(doc, {
			startY: 74,
			head: [["Type", "Period", "PnL", "Commission", "Fee", "Swap", "Net"]],
			body: exportRows.map((row) => [
				row.periodType,
				row.period,
				formatSignedMoney(row.pnl),
				formatSignedMoney(row.commission),
				formatSignedMoney(row.fee),
				formatSignedMoney(row.swap),
				formatSignedMoney(row.net),
			]),
			styles: { fontSize: 9, halign: "left" },
			headStyles: { halign: "left" },
		});

		doc.save(`tax-summary-${timestamp}.pdf`);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					type="button"
					size="sm"
					className="cursor-pointer rounded border border-(--border2) px-2 py-1 text-[11px] uppercase tracking-[0.06em] text-(--text3) hover:bg-(--bg3)"
				>
					Export
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-40 p-1 bg-white dark:bg-black" align="end">
				<div className="flex flex-col gap-1">
					{EXPORT_BUTTONS.map((button) => {
						const handleExport = (): void => {
							if (button === "CSV") handleExportCsv();
							else handleExportPdf();
							setOpen(false);
						};

						return (
							<Button
								className="justify-start text-xs cursor-pointer hover:bg-(--bg3) border border-slate-200 dark:border-slate-800"
								onClick={handleExport}
								variant="ghost"
								type="button"
								key={button}
								size="sm"
							>
								Export as {button}
							</Button>
						);
					})}
				</div>
			</PopoverContent>
		</Popover>
	);
}

export default ExportTaxSummary;
