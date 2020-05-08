


const initialState = {
  
    profileData: []
};

export function ProfileReducer(state = initialState, action) {

    switch (action.type) {
        case 'PROFILELIST':
            return Object.assign({}, state, { profileData: action.data });

        case 'ADDPROFILE':
            return { ...state, profileData: [...state.profileData, action.data[0]]}
          
       
        default:
            return state;
    }
}

