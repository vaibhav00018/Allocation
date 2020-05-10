import { combineReducers } from "redux";
import { StockReducer} from './Container/Stock/StockReducer';
import { ProjectReducer} from './Container/Project/ProjectReducer';
import { ProfileReducer} from './Container/Profile/ProfileReducer';
import { LoginReducer} from './Container/Login/LoginReducer';


const rootReducer = combineReducers({
    StockReducer : StockReducer,
    ProjectReducer: ProjectReducer,
    ProfileReducer: ProfileReducer,
    LoginReducer: LoginReducer
  });
  
 export default rootReducer;