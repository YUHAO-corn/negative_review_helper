/* eslint-disable @typescript-eslint/no-explicit-any */
export function noop() {}
export const extend = Object.assign;
export const inBrowser = typeof window !== 'undefined';
export function isDef(val) {
  return val !== undefined && val !== null;
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val) {
  return typeof val === 'function';
}
export function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
export function isObject(val) {
  return val !== null && typeof val === 'object';
}
export function get(object, path) {
  const keys = path.split('.');
  let result = object;
  keys.forEach(key => {
    var _a;
    result = (_a = result[key]) !== null && _a !== void 0 ? _a : '';
  });
  return result;
}
export function pick(obj, keys, ignoreUndefined) {
  return keys.reduce((ret, key) => {
    if (!ignoreUndefined || obj[key] !== undefined) {
      ret[key] = obj[key];
    }
    return ret;
  }, {});
}
export function once(fn) {
  return (...args) => {
    if (!fn) return;
    fn(...args);
    fn = null;
  };
}