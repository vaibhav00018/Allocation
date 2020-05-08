


const initialState = {
  
    projectData: []
};

export function ProjectReducer(state = initialState, action) {

    switch (action.type) {
        case 'PROJECTLIST':
            return Object.assign({}, state, { projectData: action.data });

        case 'ADDPROJECT':
            return { ...state, projectData: [...state.projectData, action.data]}
          
       
        default:
            return state;
    }
}

