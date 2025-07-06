import { ReactElement } from 'react';
import type { Root } from 'react-dom/client';
declare const MARK = "__react_vant_root__";
declare type ContainerType = (Element | DocumentFragment) & {
    [MARK]?: Root;
};
export declare function render(node: ReactElement, container: ContainerType): void;
export declare function unmount(container: ContainerType): boolean | Promise<void>;
export {};
