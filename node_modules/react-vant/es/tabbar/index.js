import "./style/index.css";
import _Tabbar from './Tabbar';
import TabbarItem from './TabbarItem';
const Tabbar = Object.assign(_Tabbar, {
  Item: TabbarItem
});
export { Tabbar, TabbarItem };