import { isDef, isObject } from '.';
function assignKey(to, from, key) {
  const val = from[key];
  if (!isDef(val)) {
    return;
  }
  if (!Object.prototype.hasOwnProperty.call(to, key) || !isObject(val)) {
    to[key] = val;
  } else {
    // eslint-disable-next-line no-use-before-define
    to[key] = deepAssign(Object(to[key]), from[key]);
  }
}
export function deepAssign(to, from) {
  Object.keys(from).forEach(key => {
    assignKey(to, from, key);
  });
  return to;
}
export function deepClone(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  if (typeof obj === 'object') {
    return deepAssign({}, obj);
  }
  return obj;
}