export function formatBudget(num: number): string {
  if (typeof num !== "number") throw new Error("Input must be a number.");

  if (num === 0) return "N/A";

  const units = ["", "K", "M", "B", "T"];
  let index = 0;

  while (Math.abs(num) >= 1000 && index < units.length - 1) {
    num /= 1000;
    index++;
  }

  const rounded = num.toFixed(2);
  return parseFloat(rounded) === parseFloat(num.toFixed(1))
    ? `$${num.toFixed(1)}${units[index]}`
    : `$${rounded}${units[index]}`;
}
