/// <reference types="react" />
import './style/index.less';
declare const Flex: import("react").FC<import("./PropsType").FlexProps> & {
    Item: import("react").FC<import("./PropsType").FlexItemProps>;
};
export { Flex };
export default Flex;
export type { FlexProps, FlexItemProps } from './PropsType';
