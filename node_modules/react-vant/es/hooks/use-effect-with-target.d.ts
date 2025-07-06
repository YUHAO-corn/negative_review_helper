import { DependencyList, EffectCallback } from 'react';
import { BasicTarget } from '../utils/dom/getTargetElement';
declare const useEffectWithTarget: (effect: EffectCallback, deps: DependencyList, target: BasicTarget<any> | BasicTarget<any>[]) => void;
export default useEffectWithTarget;
