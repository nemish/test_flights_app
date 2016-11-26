import constants from '../constants';
import { combineReducers } from 'redux';


const flights = (state = {}, action) => {
    switch (action.type) {
        case constants.FETCH_FLIGHTS__START:
            return {...state, info: {}, isLoading: true}
        case constants.FETCH_FLIGHTS__SUCCESS:
            return {...state, info: action.data, isLoading: false};
        case constants.FETCH_FLIGHTS__FAIL:
            return {...state, isLoading: false};
        default:
            return state;
    }
}


const searchInfo = (state = {}, action) => {
    switch (action.type) {
        case constants.SEARCH_INFO_CHANGED:
            return {...state, [action.data.name]: action.data.value};
        default:
            return state;
    }
}


const appReducer = combineReducers({
    flights,
    searchInfo
})

export default appReducer;