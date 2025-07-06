/// <reference types="react" />
import './style/index.less';
import TabbarItem from './TabbarItem';
declare const Tabbar: import("react").FC<import("./PropsType").TabbarProps<string | number>> & {
    Item: import("react").FC<import("./PropsType").TabbarItemProps<string | number>>;
};
export { Tabbar, TabbarItem };
export type { TabbarProps, TabbarItemProps } from './PropsType';
