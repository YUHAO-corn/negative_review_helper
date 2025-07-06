import { useEffect, useRef } from 'react';
import { getTargetElement } from '../utils/dom/getTargetElement';
// 鼠标点击事件，click 不会监听右键
const defaultEvent = 'click';
export default function useClickAway(target, onClickAway, eventName = defaultEvent) {
  const onClickAwayRef = useRef(onClickAway);
  onClickAwayRef.current = onClickAway;
  useEffect(() => {
    const handler = event => {
      const targets = Array.isArray(target) ? target : [target];
      if (targets.some(targetItem => {
        const targetElement = getTargetElement(targetItem);
        return !targetElement || (targetElement === null || targetElement === void 0 ? void 0 : targetElement.contains(event.target));
      })) {
        return;
      }
      onClickAwayRef.current(event);
    };
    document.addEventListener(eventName, handler);
    return () => {
      document.removeEventListener(eventName, handler);
    };
  }, [target, eventName]);
}