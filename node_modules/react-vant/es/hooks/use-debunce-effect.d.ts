import type { DependencyList, EffectCallback } from 'react';
import type { DebounceOptions } from './use-debunce-fn';
declare function useDebounceEffect(effect: EffectCallback, deps?: DependencyList, options?: DebounceOptions): void;
export default useDebounceEffect;
