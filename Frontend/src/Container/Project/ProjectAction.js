
export function setProjectDataAction(projectData) {
    return {
        type: 'PROJECTLIST',
        data: projectData
    };
}

export function addItemToStore(data){
    return{
        type: 'ADDPROJECT',
        data: data
    }
}

export const FetchProjectData = () => {

    return dispatch => {
        const url = 'http://localhost:5000/project'
        fetch(url)
        .then (response => response.json())
        .then(json  => {
            console.log(json)
            dispatch(setProjectDataAction(json))})
        .catch( error => {throw error})
      };
};

export const AddProjectData = (item) =>{

    return dispatch =>{
        dispatch(addItemToStore(item))
    }
}