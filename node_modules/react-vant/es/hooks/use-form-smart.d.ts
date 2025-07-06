import { Ref } from 'react';
export declare type FormOption = {
    /**
     * initialValues
     */
    value?: Record<string, unknown>;
    /**
     * sync
     */
    sync?: boolean;
};
export declare type FormMethod = {
    set: (values: unknown) => void;
    get: (name: string) => unknown;
    submit: () => void;
    getAll: () => Record<string, unknown>;
    clear: () => void;
};
export declare type FormState = [Ref<unknown>, FormMethod];
export default function useFormSmart(option?: FormOption): FormState;
