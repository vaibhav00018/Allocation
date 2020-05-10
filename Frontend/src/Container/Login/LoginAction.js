import Axios from "axios";

import setAuthToken from "../../Utils/setAuthToken";
import jwt_decode from "jwt-decode";

export function setRegistrationAction(UserData) {
    return {
        type: 'REGISTRATION',
        data: UserData
    };
}

export function LoginAction(data){
    return{
        type: 'LOGIN',
        data: data
    }
}

// Login - get user token
export const loginUser = userData => dispatch => {
    Axios
      .post("http://localhost:5000/Login", userData)
      .then(res => {
        // Save to localStorage
  // Set token to localStorage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        console.log(token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(LoginAction(decoded));
      })
      .catch(err => err
        // dispatch({
        //   type: GET_ERRORS,
        //   payload: err.response.data
        // })
      );
  };
// export const AddProfileData = (item) =>{
//     return dispatch=>{
 
//     Axios.post("http://localhost:5000/Profile",item).then((data)=> {
//         console.log(data)
//         dispatch(addItemToStore(item))
//     }).catch(err => {
//             console.log(err);
//         });
//     }
// }