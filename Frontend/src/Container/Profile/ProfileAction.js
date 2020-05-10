
import Axios from "axios";
import browserHistory from 'react-router'
export function setProfileDataAction(profileData) {
    return {
        type: 'PROFILELIST',
        data: profileData
    };
}

export function addItemToStore(data) {
    return {
        type: 'ADDPROFILE',
        data: data
    }
}

export function error() {
    return {
        type: 'ERROR',

    }
}

export const FetchProfileData = () => {

    return dispatch => {
        const url = 'http://localhost:5000/profile'
        fetch(url, {
            headers: {
                'Authorization': localStorage.getItem("jwtToken")
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.data != undefined || json.success == false) {
                    dispatch(error())
                } else {

                    dispatch(setProfileDataAction(json))

                }


            })
            .catch(error => { throw error })
    };
};

export const AddProfileData = (item) => {
    return dispatch => {
        Axios.post("http://localhost:5000/Profile", item).then((data) => {
            console.log(data)
            dispatch(addItemToStore(item))
        }).catch(err => {
            console.log(err);
        });
    }
}