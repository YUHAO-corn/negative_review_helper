/// <reference types="react" />
import './style/index.less';
declare const ActionBar: import("react").FC<import("./PropsType").ActionBarProps> & {
    Icon: import("react").FC<import("./PropsType").ActionBarIconProps>;
    Button: import("react").FC<import("./PropsType").ActionBarButtonProps> & {
        isButton: boolean;
    };
};
export default ActionBar;
export { ActionBar };
export type { ActionBarProps, ActionBarIconProps, ActionBarButtonProps, } from './PropsType';
