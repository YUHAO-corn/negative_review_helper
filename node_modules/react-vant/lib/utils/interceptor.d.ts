export declare type Interceptor = (...args: any[]) => Promise<boolean> | boolean;
export declare function callInterceptor(options: {
    interceptor?: Function;
    args: any[];
    done: () => void;
    canceled?: () => void;
}): void;
