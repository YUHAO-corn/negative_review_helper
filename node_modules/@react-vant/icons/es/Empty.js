import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props)));
const SvgEmpty = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgEmpty" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgEmpty;
