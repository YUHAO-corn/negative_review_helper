import { BasicTarget } from '../utils/dom/getTargetElement';
declare type ScrollElement = Element | HTMLElement | Window;
export declare function getScrollParent(el: Element, root?: ScrollElement): ScrollElement;
declare function useScrollParent(el: BasicTarget<HTMLElement | Element | Window | Document>): Element | Window;
export default useScrollParent;
