/// <reference types="react" />
import './style/index.less';
import SidebarItem from './SidebarItem';
declare const Sidebar: import("react").FC<import("./PropsType").SidebarProps> & {
    Item: import("react").FC<import("./PropsType").SidebarItemProps & import("./PropsType").SidebarProvide>;
};
export { Sidebar, SidebarItem };
export type { SidebarProps, SidebarItemProps } from './PropsType';
