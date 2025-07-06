import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("path", { d: "M340 300h320c22.091 0 40 17.909 40 40v320c0 22.091-17.909 40-40 40H340c-22.091 0-40-17.909-40-40V340c0-22.091 17.909-40 40-40z", fillRule: "evenodd" })));
const SvgStop = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgStop" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgStop;
