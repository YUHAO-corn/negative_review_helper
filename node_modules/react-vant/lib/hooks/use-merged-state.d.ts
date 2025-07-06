declare const useMergedState: <T, R = T>(option?: {
    defaultValue?: T | (() => T);
    value?: T;
}) => [R, (value: T) => void];
export default useMergedState;
