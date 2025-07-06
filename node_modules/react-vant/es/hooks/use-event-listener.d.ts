import { BasicTarget, TargetElement } from '../utils/dom/getTargetElement';
export declare let supportsPassive: boolean;
declare type Target = BasicTarget<TargetElement>;
export declare type UseEventListenerOptions = {
    target?: Target;
    capture?: boolean;
    passive?: boolean;
    depends?: Array<unknown>;
};
declare function useEventListener(type: string, listener: EventListener, options?: UseEventListenerOptions): void;
export default useEventListener;
