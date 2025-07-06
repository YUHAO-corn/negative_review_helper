/// <reference types="react" />
import './style/index.less';
declare const DropdownMenu: import("react").ForwardRefExoticComponent<import("./PropsType").DropdownMenuProps & import("react").RefAttributes<import("./PropsType").DropdownMenuInstance>> & {
    Item: import("react").ForwardRefExoticComponent<import("./PropsType").DropdownMenuItemProps & import("react").RefAttributes<import("./PropsType").DropdownItemInstance>>;
};
export { DropdownMenu };
export default DropdownMenu;
export type { DropdownMenuInstance, DropdownItemOption, DropdownMenuDirection, } from './PropsType';
