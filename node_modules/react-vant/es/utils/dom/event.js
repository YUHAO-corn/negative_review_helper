import React from 'react';
export function stopPropagation(event) {
  event.stopPropagation();
}
export function preventDefault(event, isStopPropagation) {
  /* istanbul ignore else */
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }
  if (isStopPropagation) {
    stopPropagation(event);
  }
}
const eventToPropRecord = {
  'click': 'onClick'
};
// https://github.com/ant-design/ant-design-mobile/blob/master/src/utils/with-stop-propagation.tsx
export function withStopPropagation(events, element) {
  const props = Object.assign({}, element.props);
  for (const key of events) {
    const prop = eventToPropRecord[key];
    props[prop] = function (e) {
      var _a, _b;
      e.stopPropagation();
      (_b = (_a = element.props)[prop]) === null || _b === void 0 ? void 0 : _b.call(_a, e);
    };
  }
  return React.cloneElement(element, props);
}