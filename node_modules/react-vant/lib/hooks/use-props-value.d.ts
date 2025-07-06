import { SetStateAction } from 'react';
declare type Options<T> = {
    value?: T;
    defaultValue?: T;
    onChange?: (v: T) => void;
};
export default function usePropsValue<T>(options: Options<T>): readonly [T, (v: SetStateAction<T>, forceTrigger?: boolean) => void];
export {};
