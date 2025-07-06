import "./style/index.css";
import _IndexBar from './IndexBar';
import IndexAnchor from './IndexAnchor';
const IndexBar = Object.assign(_IndexBar, {
  Anchor: IndexAnchor
});
export { IndexBar, IndexAnchor };