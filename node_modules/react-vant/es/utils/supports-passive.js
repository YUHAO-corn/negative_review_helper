import canUseDom from './dom/canUseDom';
export let supportsPassive = false;
if (canUseDom()) {
  try {
    const opts = {};
    Object.defineProperty(opts, 'passive', {
      get() {
        supportsPassive = true;
      }
    });
    window.addEventListener('test-passive', null, opts);
    // eslint-disable-next-line no-empty
  } catch (e) {}
}