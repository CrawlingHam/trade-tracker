export const toCurrencyString = (n: number): string => (n >= 0 ? "+" : "-") + "$" + Math.abs(n).toFixed(2);
