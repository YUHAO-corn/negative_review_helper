/// <reference types="react" />
import './style/index.less';
declare const Swiper: import("react").ForwardRefExoticComponent<import("./PropsType").SwiperProps & import("react").RefAttributes<import("./PropsType").SwiperInstance>> & {
    Item: import("react").ForwardRefExoticComponent<import("./PropsType").SwiperItemProps & import("react").RefAttributes<import("./PropsType").SwiperItemInstance>>;
};
export default Swiper;
export { Swiper };
export type { SwiperInstance, SwiperProps } from './PropsType';
