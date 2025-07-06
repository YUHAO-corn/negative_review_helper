import { isNaN } from './number';
export function isDate(val) {
  return Object.prototype.toString.call(val) === '[object Date]' && !isNaN(val.getTime());
}