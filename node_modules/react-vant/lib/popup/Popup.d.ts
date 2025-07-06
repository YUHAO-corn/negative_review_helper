import React from 'react';
import { PopupInstanceType, PopupProps } from './PropsType';
export declare const sharedPopupProps: readonly ["round", "zIndex", "closeable", "overlay", "overlayClass", "overlayStyle", "destroyOnClose", "forceRender", "lockScroll", "duration", "transition", "closeOnClickOverlay", "closeOnPopstate", "onClickOverlay", "safeAreaInsetBottom", "onOpen", "onClose", "onOpened", "onClosed", "beforeClose"];
declare const Popup: React.ForwardRefExoticComponent<PopupProps & React.RefAttributes<PopupInstanceType>>;
export default Popup;
