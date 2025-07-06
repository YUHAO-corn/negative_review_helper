import { Context } from 'react';
import { ConfigProviderProps } from './PropsType';
export declare const defaultPrefixCls = "rv";
export declare const defaultIconPrefixCls = "van-icon";
export declare type ConfigProviderContextState = Pick<ConfigProviderProps, 'locale'>;
export declare const INITIAL_STATE: ConfigProviderContextState;
declare const ConfigProvider: Context<ConfigProviderContextState>;
export default ConfigProvider;
