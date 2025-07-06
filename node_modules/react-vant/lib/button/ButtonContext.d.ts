import React from 'react';
import { ButtonGroupProps } from './PropsType';
declare type ButtonContextType = {
    parent?: ButtonGroupProps;
};
declare const ButtonContext: React.Context<ButtonContextType>;
export default ButtonContext;
