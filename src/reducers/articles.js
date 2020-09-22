import {constants} from '../actions/articles';

const _ = require('lodash');
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
    let article, newState;

    switch (action.type) {
        case constants.RESPONSE_FIND_ARTICLE_SUCCEED:
            article = action.payload.article;
            newState = {
                ...state,
                detail: article
            };
            if(!_.isEmpty(state.index.Items)) {
                let Items = _.remove(state.index.Items, function(a) {
                    return (a.slug !== article.slug);
                });

                newState.index = {
                    ...state.index,
                    Items: [
                        article,
                        ...Items
                    ]
                }
            }

            return newState;

        case constants.RESPONSE_CREATE_NEW_ARTICLE_SUCCEED:
            return {
                ...state,
                index: {
                    Count: state.index.Count + 1,
                    ScannedCount: state.index.ScannedCount + 1,
                    Items: [
                        action.payload.article,
                        ...state.index.Items
                    ],
                    LastEvaluatedKey: state.index.LastEvaluatedKey,
                    currentPage: state.index.currentPage
                }
            };

        case constants.RESPONSE_UPDATE_ARTICLE_SUCCEED:
            article = action.payload.article.Attributes;
            newState = {
                ...state,
                detail: article
            };
            if(!_.isEmpty(state.index.Items)) {
                let Items = _.remove(state.index.Items, function(a) {
                    return (a.slug !== article.slug);
                });

                newState.index = {
                    ...state.index,
                    Items: [
                        article,
                        ...Items
                    ]
                }
            }

            return newState;

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
