export function floatToBigNumber(float: number, decimals: number): string {
  return Math.floor(float * 10 ** decimals).toLocaleString('fullwide', { useGrouping:false });
}

export default floatToBigNumber;