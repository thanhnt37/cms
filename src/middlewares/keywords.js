import { put, call, throttle } from 'redux-saga/effects';

import { constants as keywordConstants, actions as keywordActions } from '../actions/keywords';
import { actions as globalMessageActions } from '../actions/globalMessages';
import { actions as pageLoadingActions } from "../actions/pageLoading";
import * as KeywordModel from '../dynamodb/Keyword';

export default [
    throttle(3000, keywordConstants.REQUEST_CREATE_NEW_KEYWORD, createNewKeyword),
    throttle(3000, keywordConstants.REQUEST_GET_ALL_KEYWORDS, getAllKeywords),
];

function* createNewKeyword({payload, type}) {
    try {
        const keyword = yield call(KeywordModel.create, payload.keyword);

        yield put(keywordActions.responseCreateNewKeywordSucceed(keyword));
        yield put(globalMessageActions.newSuccessMessage('Successfully, Keyword is created !!!'));
    } catch (e) {
        yield put(keywordActions.responseCreateNewKeywordFailed());
        yield put(globalMessageActions.newErrorMessage('Failed, Keyword is not created !!!'));
        yield put(pageLoadingActions.stopPageLoading());
    }
}

function* getAllKeywords({payload, type}) {
    try {
        const keywords = yield call(KeywordModel.all);

        yield put(keywordActions.responseGetAllKeywordsSucceed(keywords));
    } catch (e) {
        yield put(keywordActions.responseGetAllKeywordsFailed());
        yield put(pageLoadingActions.stopPageLoading());
    }
}
