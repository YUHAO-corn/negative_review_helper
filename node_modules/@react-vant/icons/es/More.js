import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("path", { d: "M500 55.556c245.46 0 444.444 198.984 444.444 444.444S745.46 944.444 500 944.444 55.556 745.46 55.556 500 254.54 55.556 500 55.556zm0 388.888c-30.682 0-55.556 24.874-55.556 55.556s24.874 55.556 55.556 55.556 55.556-24.874 55.556-55.556-24.874-55.556-55.556-55.556zm-222.222 0c-30.683 0-55.556 24.874-55.556 55.556s24.873 55.556 55.556 55.556c30.682 0 55.555-24.874 55.555-55.556s-24.873-55.556-55.555-55.556zm444.444 0c-30.682 0-55.555 24.874-55.555 55.556s24.873 55.556 55.555 55.556c30.683 0 55.556-24.874 55.556-55.556s-24.873-55.556-55.556-55.556z", fillRule: "evenodd" })));
const SvgMore = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgMore" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgMore;
