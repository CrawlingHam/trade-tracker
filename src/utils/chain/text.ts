export function text(content: string) {
	let value = content;

	return {
		removePatterns(patterns: string[] = [], removeDuplicatePatterns: boolean = false) {
			if (patterns.length > 0) {
				for (const pattern of patterns) {
					const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
					const regex = new RegExp(escapedPattern, "g");
					value = value.replace(regex, "");
				}
			}

			if (removeDuplicatePatterns) value = value.replace(/(\W)\1+/g, "$1");

			return this;
		},

		capitalizeWords(capitalizeAll = false) {
			const words = value.split(/\s+/);

			value = words
				.map((word) => {
					if (!word.length) return word;
					if (word.length === 1 || capitalizeAll) return word.toUpperCase();
					return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
				})
				.join(" ");

			return this;
		},

		capitalize() {
			if (!value.length) return this;

			const firstAlphaIndex = value.search(/[a-z]/i);
			if (firstAlphaIndex < 0) return this;

			const before = value.slice(0, firstAlphaIndex);
			const after = value.slice(firstAlphaIndex + 1);
			value = `${before}${value.charAt(firstAlphaIndex).toUpperCase()}${after.toLowerCase()}`;

			return this;
		},

		capitalizeAll() {
			value = value.toUpperCase();
			return this;
		},

		removeLastChar() {
			if (value.length > 0) {
				value = value.slice(0, -1);
			}
			return this;
		},

		toString() {
			return value;
		},

		value() {
			return value;
		},
	};
}
