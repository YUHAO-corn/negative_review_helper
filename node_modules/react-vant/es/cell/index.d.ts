/// <reference types="react" />
import './style/index.less';
import CellGroup from './CellGroup';
declare const Cell: import("react").FC<import("./PropsType").CellProps> & {
    Group: import("react").FC<import("./PropsType").CellGroupProps>;
};
export default Cell;
export { Cell, CellGroup };
export type { CellProps, CellGroupProps, CellArrowDirection } from './PropsType';
