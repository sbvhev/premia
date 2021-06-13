export function roundToLog(
  value: number,
  plusX: number = 0,
  multiplier = 1,
): number {
  const rounding =
    Math.pow(10, Math.ceil(Math.log10(value)) + plusX) * multiplier;

  console.log('step 1:', Math.ceil(Math.log10(value)));
  console.log('step 2:', rounding);
  console.log('final: ', Math.round(value / rounding) * rounding);

  return Math.round(value / rounding) * rounding;
}

export default roundToLog;
