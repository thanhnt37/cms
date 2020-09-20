import {constants} from '../actions/articles';

const initState = {
    index: {
        Count: 0,
        ScannedCount: 0,
        Items: [],
        LastEvaluatedKey: {},
        currentPage: 0
    },
    detail: {},
    allSlugs: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case constants.RESPONSE_FIND_ARTICLE_SUCCEED:
            return {
                ...state,
                detail: action.payload.article
            };


        // TODO: create & update article

        case constants.RESPONSE_GET_LIST_ARTICLES_SUCCEED:
            return {
                ...state,
                index: {
                    Count: state.index.Count + parseInt(action.payload.articles.Count),
                    ScannedCount: state.index.ScannedCount + parseInt(action.payload.articles.ScannedCount),
                    Items: [
                        ...state.index.Items,
                        ...action.payload.articles.Items
                    ],
                    LastEvaluatedKey: action.payload.articles.LastEvaluatedKey ? action.payload.articles.LastEvaluatedKey : {},
                    currentPage: state.index.currentPage
                },
                detail: {}
            };

        case constants.REQUEST_CHANGE_PAGE:
            return {
                ...state,
                index: {
                    ...state.index,
                    currentPage: action.payload.page
                }
            };


        case constants.RESPONSE_ALL_ARTICLE_SLUGS_SUCCEED:
            return {
                ...state,
                allSlugs: action.payload.articles.Items
            };

        default:
            return state;
    }
}
