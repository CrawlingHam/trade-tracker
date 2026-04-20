import { DayPicker } from "react-day-picker";
import { type ComponentProps } from "react";
import { Button } from "../button";

export type CalendarProps = ComponentProps<typeof DayPicker> & {
	buttonVariant?: ComponentProps<typeof Button>["variant"];
};
