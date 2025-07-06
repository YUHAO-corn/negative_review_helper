import React from 'react';
declare type SkuStepperProps = {
    currentNum: number;
    onChange: (v: number) => void;
    onSkuStepperState: (v: any) => void;
    onSkuOverLimit?: (v: any) => void;
    stock?: number;
    stepperTitle?: React.ReactNode;
    disableStepperInput?: boolean;
    hideQuotaText?: boolean;
    quota?: number | string;
    quotaUsed?: number | string;
    startSaleNum?: number | string;
    customStepperConfig?: any;
};
declare const SkuStepper: React.FC<SkuStepperProps>;
export default SkuStepper;
