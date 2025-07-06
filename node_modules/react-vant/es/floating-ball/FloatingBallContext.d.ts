import { Context } from 'react';
export interface FloatingBallItemState {
    close?: () => void;
}
declare const FloatingBallItem: Context<FloatingBallItemState>;
export default FloatingBallItem;
