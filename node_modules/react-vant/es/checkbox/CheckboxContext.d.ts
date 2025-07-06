import { Context } from 'react';
import { CheckboxGroupProps } from './PropsType';
export interface CheckboxContextState {
    parent?: {
        props: CheckboxGroupProps;
    };
    toggle?: (names: Array<string | number>) => void;
    checked?: (string | number)[];
}
declare const CheckboxContext: Context<CheckboxContextState>;
export default CheckboxContext;
