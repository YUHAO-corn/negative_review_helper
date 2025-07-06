import { useRef } from 'react';
import useMemoizedFn from './use-memoized-fn';
import useUpdate from './use-update';
export default function usePropsValue(options) {
  const {
    value,
    defaultValue,
    onChange
  } = options;
  const update = useUpdate();
  const stateRef = useRef(value !== undefined ? value : defaultValue);
  if (value !== undefined) {
    stateRef.current = value;
  }
  const setState = useMemoizedFn((v, forceTrigger) => {
    // `forceTrigger` means trigger `onChange` even if `v` is the same as `stateRef.current`
    const nextValue = typeof v === 'function' ? v(stateRef.current) : v;
    if (!forceTrigger && nextValue === stateRef.current) return;
    stateRef.current = nextValue;
    update();
    onChange === null || onChange === void 0 ? void 0 : onChange(nextValue);
  });
  return [stateRef.current, setState];
}