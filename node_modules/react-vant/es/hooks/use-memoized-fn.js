import { useMemo, useRef } from 'react';
import { isFunction } from '../utils';
import { devWarning } from '../utils/dev-log';
function useMemoizedFn(fn) {
  if (process.env.NODE_ENV === 'development') {
    if (!isFunction(fn)) {
      devWarning('useMemoizedFn', `expected parameter is a function, got ${typeof fn}`);
    }
  }
  const fnRef = useRef(fn);
  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo(() => fn, [fn]);
  const memoizedFn = useRef();
  if (!memoizedFn.current) {
    memoizedFn.current = function (...args) {
      return fnRef.current.apply(this, args);
    };
  }
  return memoizedFn.current;
}
export default useMemoizedFn;