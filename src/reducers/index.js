import {combineReducers} from 'redux';

import authenticate from './authenticate';
import leftMenu from './leftMenu';
import globalMessages from './globalMessages';
import pageLoading from './pageLoading';

export default combineReducers({
    authenticate,
    leftMenu,
    globalMessages,
    pageLoading
});
