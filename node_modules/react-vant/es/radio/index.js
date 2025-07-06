import "./style/index.css";
import RadioGroup from './RadioGroup';
import _Radio from './Radio';
const Radio = Object.assign(_Radio, {
  Group: RadioGroup
});
export { Radio, RadioGroup };