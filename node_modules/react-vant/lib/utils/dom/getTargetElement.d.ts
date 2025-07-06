import { MutableRefObject } from 'react';
export declare type BasicTarget<T = HTMLElement> = (() => T | null) | T | null | MutableRefObject<T | null | undefined>;
export declare type TargetElement = HTMLElement | Element | Document | Window;
export declare function getTargetElement(target?: BasicTarget<TargetElement>, defaultElement?: TargetElement): TargetElement | undefined | null;
