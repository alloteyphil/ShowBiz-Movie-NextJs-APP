export function convertMinutes(minutes: number): string {
  if (minutes < 0) {
    throw new Error("Minutes cannot be negative.");
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}hr${hours !== 1 ? "s" : ""} ${remainingMinutes}min${
    remainingMinutes !== 1 ? "s" : ""
  }`;
}
