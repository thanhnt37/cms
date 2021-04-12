export const constants = {
    REQUEST_CREATE_NEW_KEYWORD: 'REQUEST_CREATE_NEW_KEYWORD',
    RESPONSE_CREATE_NEW_KEYWORD_SUCCEED: 'RESPONSE_CREATE_NEW_KEYWORD_SUCCEED',
    RESPONSE_CREATE_NEW_KEYWORD_FAILED: 'RESPONSE_CREATE_NEW_KEYWORD_FAILED',

    REQUEST_UPDATE_KEYWORD: 'REQUEST_UPDATE_KEYWORD',
    RESPONSE_UPDATE_KEYWORD_SUCCEED: 'RESPONSE_UPDATE_KEYWORD_SUCCEED',
    RESPONSE_UPDATE_KEYWORD_FAILED: 'RESPONSE_UPDATE_KEYWORD_FAILED',

    REQUEST_FIND_KEYWORD: 'REQUEST_FIND_KEYWORD',
    RESPONSE_FIND_KEYWORD_SUCCEED: 'RESPONSE_FIND_KEYWORD_SUCCEED',
    RESPONSE_FIND_KEYWORD_FAILED: 'RESPONSE_FIND_KEYWORD_FAILED',

    REQUEST_GET_LIST_KEYWORDS: 'REQUEST_GET_LIST_KEYWORDS',
    RESPONSE_GET_LIST_KEYWORDS_SUCCEED: 'RESPONSE_GET_LIST_KEYWORDS_SUCCEED',
    RESPONSE_GET_LIST_KEYWORDS_FAILED: 'RESPONSE_GET_LIST_KEYWORDS_FAILED',

    REQUEST_GET_ALL_KEYWORDS: 'REQUEST_GET_ALL_KEYWORDS',
    RESPONSE_GET_ALL_KEYWORDS_SUCCEED: 'RESPONSE_GET_ALL_KEYWORDS_SUCCEED',
    RESPONSE_GET_ALL_KEYWORDS_FAILED: 'RESPONSE_GET_ALL_KEYWORDS_FAILED',
};

export const actions = {
    requestCreateNewKeyword: (keyword) => ({type: constants.REQUEST_CREATE_NEW_KEYWORD, payload: {keyword}}),
    responseCreateNewKeywordSucceed: (keyword) => ({type: constants.RESPONSE_CREATE_NEW_KEYWORD_SUCCEED, payload: {keyword}}),
    responseCreateNewKeywordFailed: () => ({type: constants.RESPONSE_CREATE_NEW_KEYWORD_FAILED, payload: {}}),

    requestUpdateKeyword: (keyword) => ({type: constants.REQUEST_UPDATE_KEYWORD, payload: {keyword}}),
    responseUpdateKeywordSucceed: (keyword) => ({type: constants.RESPONSE_UPDATE_KEYWORD_SUCCEED, payload: {keyword}}),
    responseUpdateKeywordFailed: () => ({type: constants.RESPONSE_UPDATE_KEYWORD_FAILED, payload: {}}),

    requestFindKeyword: (slug) => ({type: constants.REQUEST_FIND_KEYWORD, payload: {slug}}),
    responseFindKeywordSucceed: (keyword) => ({type: constants.RESPONSE_FIND_KEYWORD_SUCCEED, payload: {keyword}}),
    responseFindKeywordFailed: () => ({type: constants.RESPONSE_FIND_KEYWORD_FAILED, payload: {}}),

    requestGetListKeywords: (lastEvaluatedKey = {}) => ({type: constants.REQUEST_GET_LIST_KEYWORDS, payload: {lastEvaluatedKey}}),
    responseGetListKeywordsSucceed: (keywords) => ({type: constants.RESPONSE_GET_LIST_KEYWORDS_SUCCEED, payload: {keywords}}),
    responseGetListKeywordsFailed: () => ({type: constants.RESPONSE_GET_LIST_KEYWORDS_FAILED, payload: {}}),

    requestGetAllKeywords: () => ({type: constants.REQUEST_GET_ALL_KEYWORDS, payload: {}}),
    responseGetAllKeywordsSucceed: (keywords) => ({type: constants.RESPONSE_GET_ALL_KEYWORDS_SUCCEED, payload: {keywords}}),
    responseGetAllKeywordsFailed: () => ({type: constants.RESPONSE_GET_ALL_KEYWORDS_FAILED, payload: {}}),
};
