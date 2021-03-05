export const constants = {
    REQUEST_CREATE_NEW_ARTICLE: 'REQUEST_CREATE_NEW_ARTICLE',
    RESPONSE_CREATE_NEW_ARTICLE_SUCCEED: 'RESPONSE_CREATE_NEW_ARTICLE_SUCCEED',
    RESPONSE_CREATE_NEW_ARTICLE_FAILED: 'RESPONSE_CREATE_NEW_ARTICLE_FAILED',

    REQUEST_UPDATE_ARTICLE: 'REQUEST_UPDATE_ARTICLE',
    RESPONSE_UPDATE_ARTICLE_SUCCEED: 'RESPONSE_UPDATE_ARTICLE_SUCCEED',
    RESPONSE_UPDATE_ARTICLE_FAILED: 'RESPONSE_UPDATE_ARTICLE_FAILED',

    REQUEST_FIND_ARTICLE: 'REQUEST_FIND_ARTICLE',
    RESPONSE_FIND_ARTICLE_SUCCEED: 'RESPONSE_FIND_ARTICLE_SUCCEED',
    RESPONSE_FIND_ARTICLE_FAILED: 'RESPONSE_FIND_ARTICLE_FAILED',

    REQUEST_GET_LIST_ARTICLES: 'REQUEST_GET_LIST_ARTICLES',
    RESPONSE_GET_LIST_ARTICLES_SUCCEED: 'RESPONSE_GET_LIST_ARTICLES_SUCCEED',
    RESPONSE_GET_LIST_ARTICLES_FAILED: 'RESPONSE_GET_LIST_ARTICLES_FAILED',

    REQUEST_CHANGE_PAGE: 'REQUEST_CHANGE_PAGE',
    RESPONSE_CHANGE_PAGE_SUCCEED: 'RESPONSE_CHANGE_PAGE_SUCCEED',
    RESPONSE_CHANGE_PAGE_FAILED: 'RESPONSE_CHANGE_PAGE_FAILED',

    REQUEST_ALL_ARTICLE_SLUGS: 'REQUEST_ALL_ARTICLE_SLUGS',
    RESPONSE_ALL_ARTICLE_SLUGS_SUCCEED: 'RESPONSE_ALL_ARTICLE_SLUGS_SUCCEED',
    RESPONSE_ALL_ARTICLE_SLUGS_FAILED: 'RESPONSE_ALL_ARTICLE_SLUGS_FAILED',

    REQUEST_PUBLISH_ARTICLE: 'REQUEST_PUBLISH_ARTICLE',
    RESPONSE_PUBLISH_ARTICLE_SUCCEED: 'RESPONSE_PUBLISH_ARTICLE_SUCCEED',
    RESPONSE_PUBLISH_ARTICLE_FAILED: 'RESPONSE_PUBLISH_ARTICLE_FAILED',
};

export const actions = {
    requestCreateNewArticle: (article) => ({type: constants.REQUEST_CREATE_NEW_ARTICLE, payload: {article}}),
    responseCreateNewArticleSucceed: (article) => ({type: constants.RESPONSE_CREATE_NEW_ARTICLE_SUCCEED, payload: {article}}),
    responseCreateNewArticleFailed: () => ({type: constants.RESPONSE_CREATE_NEW_ARTICLE_FAILED, payload: {}}),

    requestUpdateArticle: (article) => ({type: constants.REQUEST_UPDATE_ARTICLE, payload: {article}}),
    responseUpdateArticleSucceed: (article) => ({type: constants.RESPONSE_UPDATE_ARTICLE_SUCCEED, payload: {article}}),
    responseUpdateArticleFailed: () => ({type: constants.RESPONSE_UPDATE_ARTICLE_FAILED, payload: {}}),

    requestFindArticle: (slug) => ({type: constants.REQUEST_FIND_ARTICLE, payload: {slug}}),
    responseFindArticleSucceed: (article) => ({type: constants.RESPONSE_FIND_ARTICLE_SUCCEED, payload: {article}}),
    responseFindArticleFailed: () => ({type: constants.RESPONSE_FIND_ARTICLE_FAILED, payload: {}}),

    requestGetListArticles: (lastEvaluatedKey = {}, author = {}) => ({type: constants.REQUEST_GET_LIST_ARTICLES, payload: {lastEvaluatedKey, author}}),
    responseGetListArticlesSucceed: (articles) => ({type: constants.RESPONSE_GET_LIST_ARTICLES_SUCCEED, payload: {articles}}),
    responseGetListArticlesFailed: () => ({type: constants.RESPONSE_GET_LIST_ARTICLES_FAILED, payload: {}}),

    requestChangePage: (page) => ({type: constants.REQUEST_CHANGE_PAGE, payload: {page}}),
    responseChangePageSucceed: () => ({type: constants.RESPONSE_CHANGE_PAGE_SUCCEED, payload: {}}),
    responseChangePageFailed: () => ({type: constants.RESPONSE_CHANGE_PAGE_FAILED, payload: {}}),

    requestAllArticleSlugs: () => ({type: constants.REQUEST_ALL_ARTICLE_SLUGS, payload: {}}),
    responseAllArticleSlugsSucceed: (articles) => ({type: constants.RESPONSE_ALL_ARTICLE_SLUGS_SUCCEED, payload: {articles}}),
    responseAllArticleSlugsFailed: () => ({type: constants.RESPONSE_ALL_ARTICLE_SLUGS_FAILED, payload: {}}),

    requestPublishArticle: (slug) => ({type: constants.REQUEST_PUBLISH_ARTICLE, payload: {slug}}),
    responsePublishArticleSucceed: (slug) => ({type: constants.RESPONSE_PUBLISH_ARTICLE_SUCCEED, payload: {slug}}),
    responsePublishArticleFailed: () => ({type: constants.RESPONSE_PUBLISH_ARTICLE_FAILED, payload: {}}),
};
