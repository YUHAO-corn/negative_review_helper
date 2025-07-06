import React from 'react';
declare type SkuRowPropItemProps = {
    multiple?: boolean;
    skuValue: Record<any, any>;
    selectedProp: Record<any, any>;
    skuKeyStr: string;
    onSkuPropSelected?: (params: any) => void;
};
declare const SkuRowPropItem: React.FC<SkuRowPropItemProps>;
export default SkuRowPropItem;
