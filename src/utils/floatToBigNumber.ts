export function floatToBigNumber(float: number, decimals: number): string {
  return String(Math.floor(float * 10 ** decimals));
}

export default floatToBigNumber;