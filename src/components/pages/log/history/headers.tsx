import { LOG_CONFIG } from "@/configs";
import { type JSX } from "react";

const TradeHeaders = (): JSX.Element => (
	<thead>
		<tr>
			{LOG_CONFIG.TRADE_HEADERS.map(
				(h): JSX.Element => (
					<th key={h} className="border-b border-(--border) px-2.5 py-2 text-left text-[10px] font-medium uppercase tracking-[0.08em] text-(--text3)">
						{h}
					</th>
				)
			)}
		</tr>
	</thead>
);

export default TradeHeaders;
