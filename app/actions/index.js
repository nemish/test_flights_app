import constants from '../constants';
import { makeActionCreator } from './utils';

export const changeRequestValue = makeActionCreator(constants.SEARCH_INFO_CHANGED, 'data')