import React from 'react';
import { LazyImageProps } from './PropsType';
import { BEM } from '../utils/create/bem';
export declare const getLazyImagePlaceholder: (bem: BEM) => React.ReactNode;
export declare const IMAGE_KEY: unique symbol;
declare const ImageNamespace: React.FC<LazyImageProps> & {
    __REACT_VANT_COMPONENT: symbol;
};
export default ImageNamespace;
