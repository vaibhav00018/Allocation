import { combineReducers } from "redux";
import { StockReducer} from './Container/Stock/StockReducer';
import { ProjectReducer} from './Container/Project/ProjectReducer';

const rootReducer = combineReducers({
    StockReducer : StockReducer,
    ProjectReducer: ProjectReducer
  });
  
 export default rootReducer;