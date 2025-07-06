interface ThrottleOptions {
    wait?: number;
    leading?: boolean;
    trailing?: boolean;
}
declare type noop = (...args: any) => any;
declare function useThrottleFn<T extends noop>(fn: T, options?: ThrottleOptions): {
    run: {
        (...args: any[]): any;
        cancel: () => void;
        flush: () => any;
        pending: () => boolean;
    };
    cancel: () => void;
    flush: () => any;
};
export default useThrottleFn;
