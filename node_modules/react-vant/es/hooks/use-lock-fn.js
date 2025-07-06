import { __awaiter } from "tslib";
import { useRef, useCallback } from 'react';
function useLockFn(fn) {
  const lockRef = useRef(false);
  return useCallback((...args) => __awaiter(this, void 0, void 0, function* () {
    if (lockRef.current) return;
    lockRef.current = true;
    try {
      const ret = yield fn(...args);
      lockRef.current = false;
      return ret;
    } catch (e) {
      lockRef.current = false;
      throw e;
    }
  }), [fn]);
}
export default useLockFn;