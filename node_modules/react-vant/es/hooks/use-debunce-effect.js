import { useEffect, useState } from 'react';
import useDebounceFn from './use-debunce-fn';
import useUpdateEffect from './use-update-effect';
function useDebounceEffect(effect, deps, options) {
  const [flag, setFlag] = useState({});
  const {
    run
  } = useDebounceFn(() => {
    setFlag({});
  }, options);
  useEffect(() => {
    return run();
  }, deps);
  useUpdateEffect(effect, [flag]);
}
export default useDebounceEffect;