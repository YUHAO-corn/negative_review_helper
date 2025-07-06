import { useMemo } from 'react';
import useLatest from './use-latest';
import useUnmount from './use-unmount';
import { isFunction } from '../utils';
import { debounce } from '../utils/debounce';
import { devWarning } from '../utils/dev-log';
function useDebounceFn(fn, options) {
  var _a;
  if (process.env.NODE_ENV === 'development') {
    if (!isFunction(fn)) {
      devWarning('useDebounceFn', `expected parameter is a function, got ${typeof fn}`);
    }
  }
  const fnRef = useLatest(fn);
  const wait = (_a = options === null || options === void 0 ? void 0 : options.wait) !== null && _a !== void 0 ? _a : 1000;
  const debounced = useMemo(() => debounce((...args) => {
    return fnRef.current(...args);
  }, wait, options), []);
  useUnmount(() => {
    debounced.cancel();
  });
  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush
  };
}
export default useDebounceFn;