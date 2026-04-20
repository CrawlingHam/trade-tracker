import { Input, type SearchInputProps } from "../input";
import { type ChangeEvent, type JSX } from "react";
import { Search } from "lucide-react";
import { Label } from "../label";

function SearchInput({ placeholder, label, value, onChange }: SearchInputProps): JSX.Element {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange?.(event.target.value);
	};

	return (
		<div className="w-full max-w-sm space-y-2">
			<Label htmlFor="search-input">{label}</Label>
			<div className="relative">
				<Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
				<Input className="bg-(--bg2) pl-9" id="search-input" placeholder={placeholder} type="search" value={value} onChange={handleChange} />
			</div>
		</div>
	);
}

export { SearchInput };
