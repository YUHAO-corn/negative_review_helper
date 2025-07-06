import { FloatingBallProps } from './PropsType';
declare type Direction = '' | 'vertical' | 'horizontal';
declare type UseFloatingTouchProps = {
    /** 目标dom实例 */
    target?: HTMLElement;
    /** 初始化偏移量 */
    offset?: FloatingBallProps['offset'];
    /** 是否开始屏幕边界 */
    boundary?: boolean;
};
declare const useFloatingTouch: (props?: UseFloatingTouchProps) => {
    update: (patch: Partial<{
        startX: number;
        startY: number;
        deltaX: number;
        deltaY: number;
        offsetX: number;
        offsetY: number;
        _pointX: number;
        _pointY: number;
        /** 初始化偏移量计算渲染是否完成 */
        ready: boolean;
        direction: Direction;
    }> | ((prevState: {
        startX: number;
        startY: number;
        deltaX: number;
        deltaY: number;
        offsetX: number;
        offsetY: number;
        _pointX: number;
        _pointY: number;
        /** 初始化偏移量计算渲染是否完成 */
        ready: boolean;
        direction: Direction;
    }) => Partial<{
        startX: number;
        startY: number;
        deltaX: number;
        deltaY: number;
        offsetX: number;
        offsetY: number;
        _pointX: number;
        _pointY: number;
        /** 初始化偏移量计算渲染是否完成 */
        ready: boolean;
        direction: Direction;
    }>)) => void;
    move: EventListener;
    start: EventListener;
    reset: () => void;
    isVertical: () => boolean;
    isHorizontal: () => boolean;
    startX: number;
    startY: number;
    deltaX: number;
    deltaY: number;
    offsetX: number;
    offsetY: number;
    _pointX: number;
    _pointY: number;
    /** 初始化偏移量计算渲染是否完成 */
    ready: boolean;
    direction: Direction;
};
export default useFloatingTouch;
