import { SelectedSkuData, SkuData } from './PropsType';
export declare type SelectedValueType = {
    ks: string;
    imgUrl: string;
    position: number;
};
export declare function getSkuImgValue(sku: SkuData, selectedSku: SelectedSkuData): SelectedValueType | undefined;
export declare const normalizeSkuTree: (skuTree: any) => {};
export declare const normalizePropList: (propList: any) => {};
export declare const isAllSelected: (skuTree: any, selectedSku: any) => boolean;
export declare const getSkuComb: (skuList: any, selectedSku: any) => any;
export declare const getSelectedSkuValues: (skuTree: any, selectedSku: any) => any[];
export declare const isSkuChoosable: (skuList: any, selectedSku: any, skuToChoose: any) => boolean;
export declare const getSelectedPropValues: (propList: any, selectedProp: any) => any[];
export declare const getSelectedProperties: (propList: any, selectedProp: any) => any[];
declare const _default: {
    normalizeSkuTree: (skuTree: any) => {};
    getSkuComb: (skuList: any, selectedSku: any) => any;
    getSelectedSkuValues: (skuTree: any, selectedSku: any) => any[];
    isAllSelected: (skuTree: any, selectedSku: any) => boolean;
    isSkuChoosable: (skuList: any, selectedSku: any, skuToChoose: any) => boolean;
    getSelectedPropValues: (propList: any, selectedProp: any) => any[];
    getSelectedProperties: (propList: any, selectedProp: any) => any[];
};
export default _default;
