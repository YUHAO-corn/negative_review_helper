/// <reference types="react" />
import './style/index.less';
import CollapseItem from './CollapseItem';
declare const Collapse: import("react").FC<import("./PropsType").CollapseProps> & {
    Item: import("react").ForwardRefExoticComponent<import("./PropsType").CollapseItemProps & import("react").RefAttributes<import("./PropsType").CollapseItemInstance>>;
};
export default Collapse;
export { Collapse, CollapseItem };
export type { CollapseProps, CollapseItemProps } from './PropsType';
