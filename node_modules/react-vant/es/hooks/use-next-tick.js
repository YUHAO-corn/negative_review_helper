import { useEffect, useCallback } from 'react';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useNextTick = fn => {
  const nextTick = useCallback(handler => {
    if (handler) {
      Promise.resolve().then(() => handler());
    }
  }, []);
  useEffect(() => {
    if (fn) {
      nextTick(fn);
    }
    return () => {};
  }, [fn, nextTick]);
  return fn !== null && fn !== void 0 ? fn : nextTick;
};
export default useNextTick;