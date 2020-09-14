import {combineReducers} from 'redux';

import leftMenu from './leftMenu';
import globalMessages from './globalMessages';
import pageLoading from './pageLoading';

export default combineReducers({
    leftMenu,
    globalMessages,
    pageLoading
});
