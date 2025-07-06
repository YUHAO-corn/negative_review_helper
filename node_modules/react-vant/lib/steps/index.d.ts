/// <reference types="react" />
import './style/index.less';
import StepsItem from './StepsItem';
declare const Steps: import("react").FC<import("./PropsType").StepsProps> & {
    Item: import("react").FC<import("./PropsType").StepsItemProps>;
};
export { Steps, StepsItem };
export type { StepsProps } from './PropsType';
