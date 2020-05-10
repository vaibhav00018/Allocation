const isEmpty = require("is-empty");
const initialState = {
    isAuthenticated: false,
    user: {},
    loginData: []
};

export function LoginReducer(state = initialState, action) {

    switch (action.type) {
        case 'LOGIN':
            return { ...state, user:action.payload, isAuthenticated:true}
        case 'REGISTRATION':
            return { ...state, profileData: [...state.profileData, action.data]}
          
        case 'ERROR':
            return { ...state, profileData: [], isAuthenticated:false}
        default:
            return state;
    }
}
