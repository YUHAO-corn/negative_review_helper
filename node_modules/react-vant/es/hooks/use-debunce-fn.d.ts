export interface DebounceOptions {
    wait?: number;
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
}
declare type noop = (...args: any) => any;
declare function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions): {
    run: {
        (...args: any[]): any;
        cancel: () => void;
        flush: () => any;
        pending: () => boolean;
    };
    cancel: () => void;
    flush: () => any;
};
export default useDebounceFn;
