import type { CascaderProps } from './PropsType';
declare type KeysProps = {
    textKey: string;
    valueKey: string;
    childrenKey: string;
};
export declare function useCascaderExtend(options: CascaderProps['options'], keys: KeysProps, value: string[]): {
    tabs: import("./PropsType").CascaderOption[][];
    items: import("./PropsType").CascaderOption[];
    depth: number;
};
export {};
