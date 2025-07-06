/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
export default function useRefs() {
  const refs = React.useRef([]);
  const setRefs = React.useCallback(index => el => {
    if (el) refs.current[index] = el;
  }, []);
  const reset = React.useCallback(() => {
    refs.current = [];
  }, []);
  return [refs.current, setRefs, reset];
}