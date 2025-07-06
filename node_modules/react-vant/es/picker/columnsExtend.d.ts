import type { PickerProps, PickerValueExtend } from './PropsType';
declare type KeysProps = {
    textKey: string;
    valueKey: string;
    childrenKey: string;
};
export declare function generateColumnsExtend(rawColumns: PickerProps['columns'] | ((value: string[]) => PickerProps['columns']), keys: KeysProps, val: string[]): PickerValueExtend;
export declare function useColumnsExtend(columns: PickerProps['columns'], keys: KeysProps, value: string[]): PickerValueExtend;
export {};
