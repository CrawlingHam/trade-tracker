import { useTradeCurrency, useFirebaseGoalsObject } from "@/hooks";
import { useState, type JSX } from "react";
import { Input } from "@/components/shared";
import { IoPencil } from "react-icons/io5";
import { formatMoney } from "@/utils";
import { cn } from "@/libs";

function GoalEditor({ goalKey, safeGoals, dayTarget, weekTarget, monthTarget, yearTarget }: Pages.Dashboard.Props.GoalEditor): JSX.Element {
	const [editingGoal, setEditingGoal] = useState<Trade.GoalKey | null>(null);
	const [draftValue, setDraftValue] = useState<string>("0");
	const { setGoals } = useFirebaseGoalsObject();
	const moneyFormatter = useTradeCurrency();

	const goalValue = goalKey === "daily" ? dayTarget : goalKey === "weekly" ? weekTarget : goalKey === "monthly" ? monthTarget : yearTarget;

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (e.key !== "Enter") return;
		void saveSingleGoal();
	};

	const saveSingleGoal = async (): Promise<void> => {
		const parsed = Number.parseFloat(draftValue);
		if (Number.isNaN(parsed) || parsed < 0) {
			setEditingGoal(null);
			return;
		}

		if (goalKey === "daily") await setGoals({ ...safeGoals, daily: parsed });
		if (goalKey === "weekly") await setGoals({ ...safeGoals, weekly: parsed });
		if (goalKey === "monthly") await setGoals({ ...safeGoals, monthly: parsed });
		if (goalKey === "yearly") await setGoals({ ...safeGoals, yearly: parsed });

		setEditingGoal(null);
	};

	const handleButtonClick = (): void => {
		setDraftValue(goalValue.toFixed(2));
		setEditingGoal(goalKey);
	};

	return (
		<span className="w-3/4 flex flex-col items-center gap-0.5 text-[10px] text-(--text2)">
			<span>of</span>

			{editingGoal === goalKey ? (
				<>
					<Input
						onChange={(e) => setDraftValue(e.target.value)}
						onBlur={() => void saveSingleGoal()}
						onKeyDown={handleKeyDown}
						value={draftValue}
						type="number"
						step="0.01"
						autoFocus
						className={cn(
							"h-6 w-16 px-2 py-0 text-[10px]",
							"[&::-webkit-inner-spin-button]:cursor-pointer [&::-webkit-outer-spin-button]:cursor-pointer [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
						)}
					/>
				</>
			) : (
				<>
					<span className="group flex items-center gap-1">
						{formatMoney(goalValue, moneyFormatter)}

						<button
							className="cursor-pointer rounded p-0.5 w-full text-(--text3) opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
							aria-label={`Edit ${goalKey} goal`}
							onClick={handleButtonClick}
							type="button"
						>
							<IoPencil className="size-3" />
						</button>
					</span>
				</>
			)}
		</span>
	);
}

export default GoalEditor;
