import { Context } from 'react';
import { RadioGroupProps, RadioValueType } from './PropsType';
export interface RadioContextState<T = RadioValueType> {
    parent?: {
        props: RadioGroupProps<T>;
    };
    toggle?: (name: T) => void;
    checked?: T;
}
declare const RadioContext: Context<RadioContextState>;
export default RadioContext;
