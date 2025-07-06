declare function throttle(func: any, wait: any, options?: any): {
    (...args: any[]): any;
    cancel: () => void;
    flush: () => any;
    pending: () => boolean;
};
export default throttle;
