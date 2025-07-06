import { Context } from 'react';
export interface FlexContextState {
    gutter?: [number, number];
}
declare const FlexContext: Context<FlexContextState>;
export default FlexContext;
