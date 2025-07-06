import './style/index.less';
import React from 'react';
import { TypographyTextProps, TypographyTitleProps, TypographyLinkProps } from './PropsType';
declare const TypographyNamespace: React.FC<import("./PropsType").TypographyBaseProps & {
    renderType: string;
}> & {
    Text: (props: TypographyTextProps) => JSX.Element;
    Title: (props: TypographyTitleProps) => JSX.Element;
    Link: (props: TypographyLinkProps) => JSX.Element;
};
export { TypographyNamespace as Typography };
export type { TypographyBaseProps as TypographyProps, TypographySize, TypographyType, TypographyTitleLevel, } from './PropsType';
