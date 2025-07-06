import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("path", { d: "M537.5 537.5h-400c-20.71 0-37.5-16.79-37.5-37.5s16.79-37.5 37.5-37.5h725c20.71 0 37.5 16.79 37.5 37.5s-16.79 37.5-37.5 37.5h-325z", fillRule: "nonzero" })));
const SvgMinus = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgMinus" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgMinus;
