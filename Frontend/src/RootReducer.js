import { combineReducers } from "redux";
import { StockReducer} from './Container/Stock/StockReducer';
import { ProjectReducer} from './Container/Project/ProjectReducer';
import { ProfileReducer} from './Container/Profile/ProfileReducer';

const rootReducer = combineReducers({
    StockReducer : StockReducer,
    ProjectReducer: ProjectReducer,
    ProfileReducer: ProfileReducer
  });
  
 export default rootReducer;