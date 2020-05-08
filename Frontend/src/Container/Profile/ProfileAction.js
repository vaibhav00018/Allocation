
import Axios from "axios";
export function setProfileDataAction(profileData) {
    return {
        type: 'PROFILELIST',
        data: profileData
    };
}

export function addItemToStore(data){
    return{
        type: 'ADDPROFILE',
        data: data
    }
}

export const FetchProfileData = () => {

    return dispatch => {
        const url = 'http://localhost:5000/profile'
        fetch(url)
        .then (response => response.json())
        .then(json  => {
            //console.log(json)
            dispatch(setProfileDataAction(json))})
        .catch( error => {throw error})
      };
};

export const AddProfileData = (item) =>{
    return dispatch=>{
 
    Axios.post("http://localhost:5000/Profile",item).then((data)=> {
        console.log(data)
        dispatch(addItemToStore(item))
    }).catch(err => {
            console.log(err);
        });
    }
}