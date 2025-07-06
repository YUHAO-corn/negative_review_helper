import { __awaiter } from "tslib";
import * as ReactDOM from 'react-dom';
import { reactDomVersion } from './version';
// Let compiler not to search module usage
const fullClone = Object.assign({}, ReactDOM);
const {
  render: reactRender,
  unmountComponentAtNode
} = fullClone;
let createRoot;
try {
  if (reactDomVersion >= 18 && fullClone.createRoot) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    createRoot = fullClone.createRoot;
  }
} catch (e) {
  // Do nothing;
}
function toggleWarning(skip) {
  const {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  } = fullClone;
  if (__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED && typeof __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === 'object') {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = skip;
  }
}
const MARK = '__react_vant_root__';
function legacyRender(node, container) {
  reactRender(node, container);
}
function concurrentRender(node, container) {
  toggleWarning(true);
  const root = container[MARK] || createRoot(container);
  toggleWarning(false);
  root.render(node);
  container[MARK] = root;
}
export function render(node, container) {
  if (createRoot) {
    concurrentRender(node, container);
    return;
  }
  legacyRender(node, container);
}
// ========================== Unmount =========================
function legacyUnmount(container) {
  return unmountComponentAtNode(container);
}
function concurrentUnmount(container) {
  return __awaiter(this, void 0, void 0, function* () {
    // Delay to unmount to avoid React 18 sync warning
    return Promise.resolve().then(() => {
      var _a;
      (_a = container[MARK]) === null || _a === void 0 ? void 0 : _a.unmount();
      delete container[MARK];
    });
  });
}
export function unmount(container) {
  if (createRoot) {
    return concurrentUnmount(container);
  }
  return legacyUnmount(container);
}