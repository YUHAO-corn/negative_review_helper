import React from 'react';
import { GridProps, GridItemProps } from './PropsType';
declare type InternalProps = {
    parent?: GridProps;
    index?: number;
};
declare const GridItem: React.FC<GridItemProps & InternalProps>;
export default GridItem;
