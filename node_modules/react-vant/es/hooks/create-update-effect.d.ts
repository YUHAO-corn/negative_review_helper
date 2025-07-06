import type { useEffect, useLayoutEffect } from 'react';
declare type EffectHookType = typeof useEffect | typeof useLayoutEffect;
export declare const createUpdateEffect: (hook: EffectHookType) => EffectHookType;
export {};
