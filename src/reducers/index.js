import {combineReducers} from 'redux';

import authenticate from './authenticate';
import leftMenu from './leftMenu';
import globalMessages from './globalMessages';
import pageLoading from './pageLoading';
import articles from './articles';
import s3 from './s3';
import keywords from './keywords';

export default combineReducers({
    authenticate,
    leftMenu,
    globalMessages,
    pageLoading,
    articles,
    s3,
    keywords
});
