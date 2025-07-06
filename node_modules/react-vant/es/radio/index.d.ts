import './style/index.less';
import RadioGroup from './RadioGroup';
import _Radio from './Radio';
declare const Radio: typeof _Radio & {
    Group: typeof RadioGroup;
};
export { Radio, RadioGroup };
export type { RadioGroupProps, RadioProps } from './PropsType';
