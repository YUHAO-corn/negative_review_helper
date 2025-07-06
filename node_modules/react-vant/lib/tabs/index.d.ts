/// <reference types="react" />
import './style/index.less';
declare const Tabs: import("react").ForwardRefExoticComponent<import("./PropsType").TabsProps & import("react").RefAttributes<import("./PropsType").TabsInstance>> & {
    TabPane: import("react").ForwardRefExoticComponent<import("./PropsType").TabPaneProps & import("react").RefAttributes<HTMLDivElement>>;
};
export default Tabs;
export { Tabs };
export type { TabsInstance } from './PropsType';
