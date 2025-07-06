import "./style/index.css";
import _DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';
const DropdownMenu = Object.assign(_DropdownMenu, {
  Item: DropdownMenuItem
});
export { DropdownMenu };
export default DropdownMenu;