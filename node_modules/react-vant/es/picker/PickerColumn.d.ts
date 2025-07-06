import React from 'react';
import { PickerColumnProps } from './PropsType';
declare const PickerColumn: React.NamedExoticComponent<PickerColumnProps & {
    ref?: React.ForwardedRef<{
        stopMomentum: () => void;
    }>;
}>;
export default PickerColumn;
