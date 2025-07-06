/// <reference types="react" />
import './style/index.less';
import GridItem from './GridItem';
declare const GridNamespace: import("react").FC<import("./PropsType").GridProps> & {
    Item: import("react").FC<import("./PropsType").GridItemProps & {
        parent?: import("./PropsType").GridProps;
        index?: number;
    }>;
};
export { GridNamespace as Grid, GridItem };
export type { GridProps, GridItemProps, GridDirection } from './PropsType';
