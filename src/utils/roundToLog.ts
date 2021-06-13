export function roundToLog(
  value: number,
  plusX: number = 0,
  multiplier = 1,
): number {
  const rounding =
    Math.pow(10, Math.ceil(Math.log10(value)) + plusX) * multiplier;
  return Math.round(value / rounding) * rounding;
}

export default roundToLog;
