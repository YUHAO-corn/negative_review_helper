import * as React from 'react';
import IconBase from './IconBase';
const SvgIcon = (props) => (React.createElement("svg", Object.assign({ width: "1em", height: "1em", viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" }, props),
    React.createElement("g", { transform: "translate(0 55.556)", fillRule: "evenodd" },
        React.createElement("path", { d: "M132.939 55.364c42.68 0 78.461 32.247 82.885 74.697l3.813 36.605h723.472a1 1 0 01.959 1.282L830.422 554.905a1 1 0 01-.866.714l-563.885 52.84 3.5 33.586c1.475 14.15 13.402 24.899 27.629 24.899h534.848c15.341 0 27.778 12.436 27.778 27.777 0 15.342-12.437 27.778-27.778 27.778H296.8c-42.68 0-78.462-32.246-82.885-74.697L160.567 135.82c-1.474-14.15-13.401-24.899-27.628-24.899H55.556c-15.342 0-27.778-12.437-27.778-27.778s12.436-27.778 27.778-27.778h77.383z" }),
        React.createElement("circle", { cx: 333.333, cy: 833.333, r: 55.556 }),
        React.createElement("circle", { cx: 722.222, cy: 833.333, r: 55.556 }))));
const SvgShoppingCart = React.forwardRef((props, ref) => {
    return (React.createElement(IconBase, Object.assign({ name: "SvgShoppingCart" }, props, { ref: ref }),
        React.createElement(SvgIcon, null)));
});
export default SvgShoppingCart;
