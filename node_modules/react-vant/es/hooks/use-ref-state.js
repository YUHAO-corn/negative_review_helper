import { useCallback, useRef, useState } from 'react';
import { isFunction } from '../utils';
export default function useRefState(initialState) {
  const [state, setState] = useState(initialState);
  const ref = useRef(state);
  const setRafState = useCallback(patch => {
    setState(prevState => {
      // eslint-disable-next-line no-return-assign
      return ref.current = isFunction(patch) ? patch(prevState) : patch;
    });
  }, [state]);
  return [state, setRafState, ref];
}