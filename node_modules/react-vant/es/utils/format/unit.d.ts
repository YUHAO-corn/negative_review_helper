import React from 'react';
export declare function addUnit(value?: string | number): string | undefined;
export declare function getSizeStyle(originSize?: string | number): {
    width: string;
    height: string;
} | {
    width?: undefined;
    height?: undefined;
};
export declare function getZIndexStyle(zIndex?: string | number): React.CSSProperties;
export declare function unitToPx(value: string | number): number;
export declare function kebabCase(str: string): string;
