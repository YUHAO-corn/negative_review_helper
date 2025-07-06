import type { Dispatch, SetStateAction, MutableRefObject } from 'react';
declare type StateType<T> = T | (() => T);
export default function useRefState<T>(initialState: StateType<T>): [T, Dispatch<SetStateAction<T>>, MutableRefObject<T>];
export {};
