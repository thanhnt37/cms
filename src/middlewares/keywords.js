import { put, call, throttle } from 'redux-saga/effects';

import { constants as keywordConstants, actions as keywordActions } from '../actions/keywords';
import { actions as globalMessageActions } from '../actions/globalMessages';
import { actions as pageLoadingActions } from "../actions/pageLoading";
import * as KeywordModel from '../dynamodb/Keyword';

export default [
    throttle(3000, keywordConstants.REQUEST_GET_ALL_KEYWORDS, getAllArticles),
];

function* getAllArticles({payload, type}) {
    try {
        const keywords = yield call(KeywordModel.all);

        yield put(keywordActions.responseGetAllKeywordsSucceed(keywords));
    } catch (e) {
        yield put(keywordActions.responseGetAllKeywordsFailed());
        yield put(pageLoadingActions.stopPageLoading());
    }
}
