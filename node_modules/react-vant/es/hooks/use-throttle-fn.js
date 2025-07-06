import { useMemo } from 'react';
import useLatest from './use-latest';
import useUnmount from './use-unmount';
import { isFunction } from '../utils';
import throttle from '../utils/throttle';
function useThrottleFn(fn, options) {
  var _a;
  if (process.env.NODE_ENV === 'development') {
    if (!isFunction(fn)) {
      console.error(`useThrottleFn expected parameter is a function, got ${typeof fn}`);
    }
  }
  const fnRef = useLatest(fn);
  const wait = (_a = options === null || options === void 0 ? void 0 : options.wait) !== null && _a !== void 0 ? _a : 1000;
  const throttled = useMemo(() => throttle((...args) => {
    return fnRef.current(...args);
  }, wait, options), []);
  useUnmount(() => {
    throttled.cancel();
  });
  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush
  };
}
export default useThrottleFn;