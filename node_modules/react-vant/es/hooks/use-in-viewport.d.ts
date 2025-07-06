import { BasicTarget } from '../utils/dom/getTargetElement';
export interface Options {
    rootMargin?: string;
    threshold?: number | number[];
    root?: BasicTarget<Element>;
}
declare function useInViewport(target: BasicTarget, options?: Options): readonly [boolean, number];
export default useInViewport;
