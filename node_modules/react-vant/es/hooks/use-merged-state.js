import { useState } from 'react';
const useMergedState = option => {
  const {
    defaultValue,
    value
  } = option || {};
  const [innerValue, setInnerValue] = useState(() => {
    if (value !== undefined) {
      return value;
    }
    if (defaultValue !== undefined) {
      return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    }
    return undefined;
  });
  const mergedValue = value !== undefined ? value : innerValue;
  function triggerChange(newValue) {
    setInnerValue(newValue);
  }
  return [mergedValue, triggerChange];
};
export default useMergedState;