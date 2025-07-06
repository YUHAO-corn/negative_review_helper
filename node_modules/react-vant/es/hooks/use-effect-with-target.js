import { useEffect } from 'react';
import { useRef } from 'react';
import useUnmount from './use-unmount';
import { getTargetElement } from '../utils/dom/getTargetElement';
function depsAreSame(oldDeps, deps) {
  if (oldDeps === deps) return true;
  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], deps[i])) return false;
  }
  return true;
}
const createEffectWithTarget = useEffectType => {
  /**
   *
   * @param effect
   * @param deps
   * @param target target should compare ref.current vs ref.current, dom vs dom, ()=>dom vs ()=>dom
   */
  const useEffectWithTarget = (effect, deps, target) => {
    const hasInitRef = useRef(false);
    const lastElementRef = useRef([]);
    const lastDepsRef = useRef([]);
    const unLoadRef = useRef();
    useEffectType(() => {
      var _a;
      const targets = Array.isArray(target) ? target : [target];
      const els = targets.map(item => getTargetElement(item));
      // init run
      if (!hasInitRef.current) {
        hasInitRef.current = true;
        lastElementRef.current = els;
        lastDepsRef.current = deps;
        unLoadRef.current = effect();
        return;
      }
      if (els.length !== lastElementRef.current.length || !depsAreSame(els, lastElementRef.current) || !depsAreSame(deps, lastDepsRef.current)) {
        (_a = unLoadRef.current) === null || _a === void 0 ? void 0 : _a.call(unLoadRef);
        lastElementRef.current = els;
        lastDepsRef.current = deps;
        unLoadRef.current = effect();
      }
    });
    useUnmount(() => {
      var _a;
      (_a = unLoadRef.current) === null || _a === void 0 ? void 0 : _a.call(unLoadRef);
      // for react-refresh
      hasInitRef.current = false;
    });
  };
  return useEffectWithTarget;
};
const useEffectWithTarget = createEffectWithTarget(useEffect);
export default useEffectWithTarget;