/// <reference types="react" />
import './style/index.less';
declare const Input: import("react").ForwardRefExoticComponent<import("./PropsType").InputProps & import("react").RefAttributes<import("./PropsType").InputInstance>> & {
    TextArea: import("react").ForwardRefExoticComponent<import("../text-area").TextAreaProps & import("react").RefAttributes<import("../text-area").TextAreaInstance>>;
};
export default Input;
export { Input };
export type { InputProps, InputInstance } from './PropsType';
export type { TextAreaProps, TextAreaInstance } from '../text-area/PropsType';
