import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import clsx from 'clsx';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import { createNamespace } from '../utils';
const [bem] = createNamespace('datetime-picker');
const DateTimePicker = forwardRef((props, ref) => {
  const isTimePicker = props.type === 'time';
  if (isTimePicker) return _jsx(TimePicker, Object.assign({
    ref: ref,
    className: clsx(bem())
  }, props));
  return _jsx(DatePicker, Object.assign({
    ref: ref,
    className: clsx(bem())
  }, props));
});
export default DateTimePicker;
export { DateTimePicker };