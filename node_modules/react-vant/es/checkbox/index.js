import "./style/index.css";
import CheckboxGroup from './CheckboxGroup';
import _Checkbox from './Checkbox';
const Checkbox = Object.assign(_Checkbox, {
  Group: CheckboxGroup
});
export default Checkbox;
export { Checkbox, CheckboxGroup };