import { Context } from 'react';
import { TabbarProps } from './PropsType';
export interface TabbarState {
    parent?: TabbarProps;
}
declare const TabbarContext: Context<TabbarState>;
export default TabbarContext;
