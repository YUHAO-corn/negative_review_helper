import { createContext } from 'react';
import { zhCN as locale } from '../locale';
export const defaultPrefixCls = 'rv';
export const defaultIconPrefixCls = 'van-icon';
export const INITIAL_STATE = {
  locale
};
const ConfigProvider = createContext(INITIAL_STATE);
export default ConfigProvider;