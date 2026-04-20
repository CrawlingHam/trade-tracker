export const isNull = (value: unknown): value is null => value === null;

export const isUndefined = (value: unknown): value is undefined => value === undefined;

export const isString = (value: unknown): value is string => !isNull(value) && typeof value === "string";

export const isNumber = (value: unknown): value is number => !isNull(value) && typeof value === "number";

export const isArray = (value: unknown): value is unknown[] => !isNull(value) && Array.isArray(value);

export const isObject = (value: unknown): value is Record<string, unknown> => !isNull(value) && typeof value === "object";

export const isTheme = (value: unknown): value is Theme.Theme => !isNull(value) && isString(value) && ["dark", "light", "system"].includes(value as Theme.Theme);

export const isSymbolsObject = (value: unknown): value is Trade.SymbolsObject =>
	isObject(value) && isString(value.symbol) && isString(value.display) && isString(value.type);

export const isPair = (value: unknown): value is Trade.Pair =>
	isObject(value) && isString(value.symbol) && isNumber(value.trade_count) && isNumber(value.trade_percentage);

export const isPositionTrade = (value: unknown): value is Trade.PositionTrade => isObject(value) && "closes" in value && "opens" in value;

export const containsCurrency = <T extends boolean = false>(value: unknown): value is Firebase.Document<T> => isObject(value) && "currency" in value;
export const containsSymbol = <T extends boolean = false>(value: unknown): value is Firebase.Document<T> => isObject(value) && "symbol" in value;
