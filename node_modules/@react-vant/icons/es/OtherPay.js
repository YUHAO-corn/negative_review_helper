import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("path", { d: "M888.889 166.667c30.667 0 55.555 24.889 55.555 55.555v555.556c0 30.666-24.888 55.555-55.555 55.555H111.11c-30.667 0-55.555-24.889-55.555-55.555V222.222c0-30.666 24.888-55.555 55.555-55.555zm0 55.555H111.11v555.556H888.89V222.222zM333.044 537.04c23 0 41.667-18.667 41.667-41.667s-18.667-41.666-41.667-41.666-41.666 18.666-41.666 41.666c0 23 18.666 41.667 41.666 41.667m166.667 0c23 0 41.667-18.667 41.667-41.667s-18.667-41.666-41.667-41.666-41.667 18.666-41.667 41.666c0 23 18.667 41.667 41.667 41.667m166.667 0c23 0 41.666-18.667 41.666-41.667s-18.666-41.666-41.666-41.666c-23 0-41.667 18.666-41.667 41.666 0 23 18.667 41.667 41.667 41.667", fillRule: "evenodd" })));
const SvgOtherPay = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgOtherPay" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgOtherPay;
