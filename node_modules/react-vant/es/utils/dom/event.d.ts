import React, { ReactElement, TouchEvent } from 'react';
export declare function stopPropagation(event: any): void;
export declare function preventDefault(event: TouchEvent | Event, isStopPropagation?: boolean): void;
export declare type PropagationEvent = 'click';
export declare function withStopPropagation(events: string[], element: ReactElement): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
