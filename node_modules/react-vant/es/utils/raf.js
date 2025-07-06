/* eslint-disable @typescript-eslint/unbound-method */
import { inBrowser } from '.';
export const root = inBrowser ? window : global;
let prev = Date.now();
function rafPolyfill(fn) {
  const curr = Date.now();
  const ms = Math.max(0, 16 - (curr - prev));
  const id = setTimeout(fn, ms);
  prev = curr + ms;
  return id;
}
export function raf(fn) {
  const requestAnimationFrame = root.requestAnimationFrame || rafPolyfill;
  return requestAnimationFrame.call(root, fn);
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function cancelRaf(id) {
  const cancelAnimationFrame = root.cancelAnimationFrame || root.clearTimeout;
  cancelAnimationFrame.call(root, id);
}
// double raf for animation
export function doubleRaf(fn) {
  raf(() => {
    raf(fn);
  });
}