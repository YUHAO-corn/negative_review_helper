import { useCallback } from 'react';
import { isFunction } from '../utils';
import useRefState from './use-ref-state';
import useUnmountedRef from './use-unmounted-ref';
const useSetState = (initialState = {}) => {
  const unmountedRef = useUnmountedRef();
  const [state, setState, ref] = useRefState(initialState);
  const setMergeState = useCallback(patch => {
    if (unmountedRef.current) return;
    setState(prevState => Object.assign(Object.assign({}, prevState), isFunction(patch) ? patch(prevState) : patch));
  }, []);
  return [state, setMergeState, ref];
};
export default useSetState;