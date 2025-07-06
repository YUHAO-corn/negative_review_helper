import React from 'react';
import { noop } from '../utils';
import { NotifyOptions, NotifyProps } from './PropsType';
declare function nextTickClear(): void;
declare const exportNotifyNamespace: React.FC<NotifyProps & import("./PropsType").NotifyPrivateProps> & {
    show: (p: string | NotifyProps) => typeof noop;
    setDefaultOptions: (options: NotifyOptions) => void;
    resetDefaultOptions: () => void;
    clear: typeof nextTickClear;
};
export default exportNotifyNamespace;
