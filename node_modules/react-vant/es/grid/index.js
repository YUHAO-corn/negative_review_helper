import "./style/index.css";
import Grid from './Grid';
import GridItem from './GridItem';
const GridNamespace = Object.assign(Grid, {
  Item: GridItem
});
export { GridNamespace as Grid, GridItem };