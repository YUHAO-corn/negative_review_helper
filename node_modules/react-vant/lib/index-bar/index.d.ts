/// <reference types="react" />
import './style/index.less';
import IndexAnchor from './IndexAnchor';
declare const IndexBar: import("react").ForwardRefExoticComponent<import("./PropsType").IndexBarProps & import("react").RefAttributes<import("./PropsType").IndexBarInstance>> & {
    Anchor: import("react").FC<import("./PropsType").IndexAnchorProps>;
};
export { IndexBar, IndexAnchor };
export type { IndexBarProps, IndexAnchorProps, IndexBarInstance, } from './PropsType';
