import { Context } from 'react';
export interface ActionBarState {
    parent?: Record<string, any>;
}
declare const ActionButtonContext: Context<ActionBarState>;
export default ActionButtonContext;
