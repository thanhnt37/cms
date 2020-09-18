import {constants} from '../actions/articles';

const initState = {
    index: {},
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

        case constants.RESPONSE_GET_LIST_ARTICLES_SUCCEED:
            return {
                ...state,
                index: action.payload.articles
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
