import { useEffect, useRef } from 'react';
const useUpdateEffect = (effect, deps) => {
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
    return undefined;
  }, deps);
};
export default useUpdateEffect;