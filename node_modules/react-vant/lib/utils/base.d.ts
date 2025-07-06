export declare function noop(): void;
export declare const extend: {
    <T extends {}, U>(target: T, source: U): T & U;
    <T_1 extends {}, U_1, V>(target: T_1, source1: U_1, source2: V): T_1 & U_1 & V;
    <T_2 extends {}, U_2, V_1, W>(target: T_2, source1: U_2, source2: V_1, source3: W): T_2 & U_2 & V_1 & W;
    (target: object, ...sources: any[]): any;
};
export declare const inBrowser: boolean;
export declare function isDef<T>(val: T): val is NonNullable<T>;
export declare function isFunction(val: unknown): val is Function;
export declare function isPromise<T = any>(val: unknown): val is Promise<T>;
export declare function isObject(val: unknown): val is Record<any, any>;
export declare function get(object: any, path: string): any;
export declare type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};
export declare function pick<T, U extends keyof T>(obj: T, keys: ReadonlyArray<U>, ignoreUndefined?: boolean): Writeable<Pick<T, U>>;
export declare function once(fn: (...args: any) => void): (...args: any) => void;
