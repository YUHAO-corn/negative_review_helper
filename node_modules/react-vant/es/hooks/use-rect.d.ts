interface Rect {
    top: number;
    left: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
}
declare const useRect: (elementRef: Element | Window) => Rect;
export { useRect as getRect };
export default useRect;
