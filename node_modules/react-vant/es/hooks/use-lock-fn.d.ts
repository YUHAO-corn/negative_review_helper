declare function useLockFn<P extends any[] = any[], V = any>(fn: (...args: P) => Promise<V>): (...args: P) => Promise<V>;
export default useLockFn;
