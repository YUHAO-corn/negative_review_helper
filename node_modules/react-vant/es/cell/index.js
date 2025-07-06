import "./style/index.css";
import CellGroup from './CellGroup';
import _Cell from './Cell';
const Cell = Object.assign(_Cell, {
  Group: CellGroup
});
export default Cell;
export { Cell, CellGroup };