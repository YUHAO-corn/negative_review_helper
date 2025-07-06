import React, { Context } from 'react';
import { TabsProps } from './PropsType';
export interface TabsContextState {
    props?: React.PropsWithChildren<TabsProps>;
    currentName?: React.ReactText;
    scrollIntoView?: (immediate?: boolean) => void;
}
declare const TabsContext: Context<TabsContextState>;
export default TabsContext;
