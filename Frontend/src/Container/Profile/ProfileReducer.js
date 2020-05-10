const initialState = {
   isAuthenticate : true,
    profileData: []
};

export function ProfileReducer(state = initialState, action) {

    switch (action.type) {
        case 'PROFILELIST':
            return { ...state, profileData: action.data, isAuthenticate: true}
           //return Object.assign({}, state, { profileData: action.data });

        case 'ADDPROFILE':
            return { ...state, profileData: [...state.profileData, action.data]}
        
        
        case 'ERROR':
            return {...state, profileData:[], isAuthenticate:false}
        default:
            return state;
    }
}

