/// <reference types="react" />
import './style/index.less';
declare const Card: import("react").FC<import("./PropsType").CardProps> & {
    Header: import("react").FC<import("./PropsType").CardHeaderProps>;
    Body: import("react").FC<import("./PropsType").CardBodyProps>;
    Footer: import("react").FC<import("./PropsType").CardFooterProps>;
    Cover: import("react").FC<import("./PropsType").CardCoverProps>;
};
export default Card;
export { Card };
