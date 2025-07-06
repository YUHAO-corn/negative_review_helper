import "./style/index.css";
import _Steps from './Steps';
import StepsItem from './StepsItem';
const Steps = Object.assign(_Steps, {
  Item: StepsItem
});
export { Steps, StepsItem };