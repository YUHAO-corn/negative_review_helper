import "./style/index.css";
import _ActionBar from './ActionBar';
import ActionBarIcon from './ActionBarIcon';
import ActionBarButton from './ActionBarButton';
const ActionBar = Object.assign(_ActionBar, {
  Icon: ActionBarIcon,
  Button: ActionBarButton
});
export default ActionBar;
export { ActionBar };