import React from 'react';
export default function useVisibilityChange(target: React.MutableRefObject<Element | undefined>, onChange?: (visible: boolean) => void): readonly [boolean];
