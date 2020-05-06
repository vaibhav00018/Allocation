


const initialState = {
    count: 2,
    stockData: []
};

export function StockReducer(state = initialState, action) {

    switch (action.type) {
        case 'STOCKDATA':
            return Object.assign({}, state, { stockData: action.data });

        case 'ADDDATA':
            return { ...state, stockData: [...state.stockData, action.data[0]], count: [++state.count]}
          
        case 'DECREMENT':
            return {
                count: state.count - 1
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
}

