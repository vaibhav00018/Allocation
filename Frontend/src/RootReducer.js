import { combineReducers } from "redux";
import { StockReducer} from './Container/Stock/StockReducer';
const rootReducer = combineReducers({
    StockReducer : StockReducer
  });
  
 export default rootReducer;