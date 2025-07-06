export function isNumeric(val) {
  return /^\d+(\.\d+)?$/.test(val);
}
export function isNaN(val) {
  if (Number.isNaN) {
    return Number.isNaN(val);
  }
  // eslint-disable-next-line no-self-compare
  return val !== val;
}