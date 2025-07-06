import React from 'react';
import type { ToastPrivateProps, ToastProps } from './PropsType';
declare const Toast: React.FC<ToastProps & ToastPrivateProps & {
    visible?: boolean;
}>;
export default Toast;
