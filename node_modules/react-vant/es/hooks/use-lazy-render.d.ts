import React, { ReactNode } from 'react';
declare function useLazyRender(show: boolean): (render: () => React.ReactNode) => () => ReactNode;
export default useLazyRender;
