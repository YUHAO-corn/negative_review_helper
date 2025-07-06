import { useState } from 'react';
import { getTargetElement } from '../utils/dom/getTargetElement';
import useEffectWithTarget from './use-effect-with-target';
function useInViewport(target, options) {
  const [state, setState] = useState();
  const [ratio, setRatio] = useState();
  useEffectWithTarget(() => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        setRatio(entry.intersectionRatio);
        setState(entry.isIntersecting);
      }
    }, Object.assign(Object.assign({}, options), {
      root: getTargetElement(options === null || options === void 0 ? void 0 : options.root)
    }));
    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [], target);
  return [state, ratio];
}
export default useInViewport;