import type { Locale } from './types';
declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
export declare type PartialLocale = DeepPartial<Locale>;
declare const zhCN: {
    [x: string]: any;
};
declare const mergeLocale: (baseLocal: Locale, mergeLocal: PartialLocale) => Locale;
export { mergeLocale };
export default zhCN;
