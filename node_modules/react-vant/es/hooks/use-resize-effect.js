import useIsomorphicLayoutEffect from './use-isomorphic-layout-effect';
import useMemoizedFn from './use-memoized-fn';
export function useResizeEffect(effect, targetRef) {
  const fn = useMemoizedFn(effect);
  useIsomorphicLayoutEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    if (window.ResizeObserver) {
      const observer = new ResizeObserver(() => {
        fn(target);
      });
      observer.observe(target);
      return () => {
        observer.disconnect();
      };
    } else {
      fn(target);
    }
  }, [targetRef]);
}