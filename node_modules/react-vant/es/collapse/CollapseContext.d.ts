import { Context } from 'react';
export interface CollapseContextState {
    isExpanded?: (name: string | number) => boolean;
    toggle?: (name: string | number, expanded: boolean) => void;
}
declare const CollapseContext: Context<CollapseContextState>;
export default CollapseContext;
