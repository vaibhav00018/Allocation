
//import data from '../../HOC/Stock.json'

const data = require('../../HOC/Stock.json')
function GetListOfItem() {
    return data;
}

export function setdashboardDataAction(dashboardStatisticsData) {
    return {
        type: 'STOCKDATA',
        data: dashboardStatisticsData
    };
}

export function addItemToStore(data){
    return{
        type: 'ADDDATA',
        data: data
    }
}

export const fetchDashboardStatisticsData = () => {
    return dispatch => {
        dispatch(setdashboardDataAction(data));
      };
};

export const AddDashboardData = (item) =>{

    return dispatch =>{
        dispatch(addItemToStore(item))
    }
}