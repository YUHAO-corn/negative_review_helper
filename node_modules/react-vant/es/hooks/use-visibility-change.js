import { useEffect, useState } from 'react';
import { inBrowser } from '../utils';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useVisibilityChange(target, onChange) {
  const [state, setState] = useState();
  useEffect(() => {
    // compatibility: https://caniuse.com/#feat=intersectionobserver
    if (!inBrowser || !window.IntersectionObserver) {
      return null;
    }
    const observer = new IntersectionObserver(entries => {
      // visibility changed
      onChange === null || onChange === void 0 ? void 0 : onChange(entries[0].intersectionRatio > 0);
      for (const entry of entries) {
        setState(entry.isIntersecting);
      }
    }, {
      root: document.body
    });
    const observe = () => {
      if (target.current) {
        observer.observe(target.current);
      }
    };
    const unobserve = () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
    observe();
    return unobserve;
  }, [target.current]);
  return [state];
}