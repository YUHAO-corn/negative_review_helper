import { Context } from 'react';
export interface IndexBarContextState {
    zIndex?: number | string;
    highlightColor?: string;
    sticky?: boolean;
}
declare const IndexBarContext: Context<IndexBarContextState>;
export default IndexBarContext;
