import constants from '../constants';
import { createAsyncAction } from './utils';

export const fetchFlights = createAsyncAction({
    url: constants.API_URL,
    startEvent: constants.FETCH_FLIGHTS__START,
    successEvent: constants.FETCH_FLIGHTS__SUCCESS,
    failEvent: constants.FETCH_FLIGHTS__FAIL
});