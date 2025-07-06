/// <reference types="react" />
import './style/index.less';
declare const Button: import("react").FC<import("./PropsType").ButtonProps> & {
    Group: import("react").FC<import("./PropsType").ButtonGroupProps>;
};
export default Button;
export { Button };
export type { ButtonProps, ButtonType, ButtonSize, ButtonIconPosition, } from './PropsType';
