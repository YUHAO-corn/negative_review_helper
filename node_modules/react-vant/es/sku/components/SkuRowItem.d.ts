import React from 'react';
declare type SkuRowItemProps = {
    lazyload?: boolean;
    skuValue: Record<any, any>;
    skuKeyStr: string;
    selectedSku: Record<any, any>;
    largeImageMode: boolean;
    disableSoldoutSku: boolean;
    skuList: any[];
    previewIcon?: React.ReactNode;
    onSkuSelected?: (params: any) => void;
    onSkuPreviewImage?: (params: any) => void;
};
declare const SkuRowItem: React.FC<SkuRowItemProps>;
export default SkuRowItem;
