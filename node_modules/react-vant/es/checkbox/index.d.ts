/// <reference types="react" />
import './style/index.less';
import CheckboxGroup from './CheckboxGroup';
declare const Checkbox: import("react").ForwardRefExoticComponent<import("./PropsType").CheckboxProps & import("react").RefAttributes<import("./PropsType").CheckboxInstance>> & {
    Group: import("react").ForwardRefExoticComponent<import("./PropsType").CheckboxGroupProps & import("react").RefAttributes<import("./PropsType").CheckboxGroupInstance>>;
};
export default Checkbox;
export { Checkbox, CheckboxGroup };
export type { CheckboxGroupInstance, CheckboxInstance, CheckboxGroupProps, CheckboxProps, CheckboxGroupToggleAllOptions, } from './PropsType';
