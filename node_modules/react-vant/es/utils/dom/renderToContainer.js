import { createPortal } from 'react-dom';
import { resolveContainer } from './getContainer';
import canUseDom from './canUseDom';
export function renderToContainer(getContainer, node) {
  if (canUseDom() && getContainer) {
    const container = resolveContainer(getContainer);
    return createPortal(node, container);
  }
  return node;
}