import React from 'react';
export interface BaseTypeProps {
    style?: React.CSSProperties | any;
    className?: string;
    children?: React.ReactNode;
}
/** 指定挂载的节点 */
export declare type TeleportType = HTMLElement | (() => HTMLElement) | null;
export declare type WithDisplayNameReactElement = React.ReactElement & {
    type: {
        displayName: string;
    };
};
