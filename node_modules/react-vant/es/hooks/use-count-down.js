import { useEffect, useMemo, useState, useRef } from 'react';
import { inBrowser } from '../utils';
import { cancelRaf, raf } from '../utils/raf';
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
function parseTime(time) {
  const days = Math.floor(time / DAY);
  const hours = Math.floor(time % DAY / HOUR);
  const minutes = Math.floor(time % HOUR / MINUTE);
  const seconds = Math.floor(time % MINUTE / SECOND);
  const milliseconds = Math.floor(time % SECOND);
  return {
    total: time,
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  };
}
function isSameSecond(time1, time2) {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}
export default function useCountDown(options) {
  const rafId = useRef(0);
  const endTime = useRef(0);
  const counting = useRef(false);
  const [remain, updateRemain] = useState(() => options.time);
  const remainRef = useRef(0);
  const currentRef = useRef({});
  const current = useMemo(() => parseTime(remain), [remain]);
  currentRef.current = current;
  remainRef.current = remain;
  const pause = () => {
    counting.current = false;
    cancelRaf(rafId.current);
  };
  const getCurrentRemain = () => Math.max(endTime.current - Date.now(), 0);
  const setRemain = value => {
    var _a, _b;
    remainRef.current = value;
    updateRemain(value);
    (_a = options.onChange) === null || _a === void 0 ? void 0 : _a.call(options, currentRef.current);
    if (value === 0) {
      pause();
      (_b = options.onFinish) === null || _b === void 0 ? void 0 : _b.call(options);
    }
  };
  const microTick = () => {
    rafId.current = raf(() => {
      // in case of call reset immediately after finish
      if (counting.current) {
        setRemain(getCurrentRemain());
        if (remainRef.current > 0) {
          microTick();
        }
      }
    });
  };
  const macroTick = () => {
    rafId.current = raf(() => {
      // in case of call reset immediately after finish
      if (counting.current) {
        const remainRemain = getCurrentRemain();
        if (!isSameSecond(remainRemain, remainRef.current) || remainRemain === 0) {
          setRemain(remainRemain);
        }
        if (remainRef.current > 0) {
          macroTick();
        }
      }
    });
  };
  const tick = () => {
    // should not start counting in server
    // see: https://github.com/youzan/vant/issues/7807
    if (!inBrowser) {
      return;
    }
    if (options.millisecond) {
      microTick();
    } else {
      macroTick();
    }
  };
  const start = () => {
    if (!counting.current) {
      endTime.current = Date.now() + remainRef.current;
      counting.current = true;
      tick();
    }
  };
  const reset = (totalTime = options.time) => {
    pause();
    remainRef.current = totalTime;
    updateRemain(totalTime);
  };
  useEffect(() => {
    if (options.autostart) {
      start();
    }
  }, []);
  return {
    start,
    pause,
    reset,
    current
  };
}