import React, { Context } from 'react';
import { DropdownMenuProps } from './PropsType';
export interface DropdownMenuState {
    props?: React.PropsWithChildren<DropdownMenuProps>;
    value?: Record<string, number | string>;
    openedMap?: Record<string, boolean>;
    onChange?: (v: any) => void;
    close?: () => void;
}
declare const DropdownMenu: Context<DropdownMenuState>;
export default DropdownMenu;
