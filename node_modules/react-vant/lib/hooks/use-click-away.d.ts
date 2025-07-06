import { MutableRefObject } from 'react';
export declare type BasicTarget<T = HTMLElement> = (() => T | null) | T | null | MutableRefObject<T | null | undefined>;
declare type EventType = MouseEvent | TouchEvent;
export default function useClickAway(target: BasicTarget | BasicTarget[], onClickAway: (event: EventType) => void, eventName?: string): void;
export {};
