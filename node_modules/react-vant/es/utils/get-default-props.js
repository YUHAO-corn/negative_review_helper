// 实现react的defaultProps和props合并
export function mergeProps(...items) {
  const result = Object.assign({}, items[0]);
  items.forEach(item => {
    for (const key in item) {
      const val = item[key];
      // eslint-disable-next-line no-prototype-builtins
      result[key] = result.hasOwnProperty(key) ? result[key] : val;
    }
  });
  return result;
}