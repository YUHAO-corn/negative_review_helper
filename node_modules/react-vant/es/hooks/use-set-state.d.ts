import React from 'react';
declare const useSetState: <T extends object>(initialState?: T) => [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void, React.MutableRefObject<T>];
export default useSetState;
