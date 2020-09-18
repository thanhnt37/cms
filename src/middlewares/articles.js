import { put, call, throttle } from 'redux-saga/effects';

import { constants as articleConstants, actions as articleActions } from '../actions/articles';
import { actions as globalMessageActions } from '../actions/globalMessages';
import { actions as pageLoadingActions } from "../actions/pageLoading";
import * as ArticleModel from '../dynamodb/Article';

export default [
    throttle(3000, articleConstants.REQUEST_CREATE_NEW_ARTICLE, createNewArticle),
    throttle(3000, articleConstants.REQUEST_UPDATE_ARTICLE, updateArticle),
    throttle(3000, articleConstants.REQUEST_FIND_ARTICLE, findArticle),
    throttle(3000, articleConstants.REQUEST_GET_LIST_ARTICLES, getListArticles),
    throttle(3000, articleConstants.REQUEST_ALL_ARTICLE_SLUGS, allArticleSlugs),
];

function* createNewArticle({payload, type}) {
    try {
        const response = yield call(ArticleModel.create, payload.article);

        yield put(articleActions.responseCreateNewArticleSucceed(response));
        yield put(globalMessageActions.newSuccessMessage('Successfully, Article is created !!!'));
    } catch (e) {
        yield put(articleActions.responseCreateNewArticleFailed());
        yield put(globalMessageActions.newErrorMessage('Failed, Article is not created !!!'));
        yield put(pageLoadingActions.stopPageLoading());
    }
}

function* updateArticle({payload, type}) {
    try {
        let article = payload.article;
        let slug = article.slug;
        delete article.slug;
        const response = yield call(ArticleModel.update, slug, article);

        yield put(articleActions.responseUpdateArticleSucceed(response));
        yield put(globalMessageActions.newSuccessMessage('Successfully, Article is updated !!!'));
    } catch (e) {
        yield put(articleActions.responseUpdateArticleFailed());
        yield put(globalMessageActions.newErrorMessage('Failed, Article is not updated !!!'));
        yield put(pageLoadingActions.stopPageLoading());
    }
}

function* findArticle({payload, type}) {
    try {
        const article = yield call(ArticleModel.findBySlug, payload.slug);

        yield put(articleActions.responseFindArticleSucceed(article));
    } catch (e) {
        yield put(articleActions.responseFindArticleFailed());
        yield put(pageLoadingActions.stopPageLoading());
    }
}

function* getListArticles({payload, type}) {
    try {
        const articles = yield call(ArticleModel.get);

        yield put(articleActions.responseGetListArticlesSucceed(articles));
    } catch (e) {
        yield put(articleActions.responseFindArticleFailed());
        yield put(pageLoadingActions.stopPageLoading());
    }
}

function* allArticleSlugs({payload, type}) {
    try {
        const articles = yield call(ArticleModel.allSlug);

        yield put(articleActions.responseAllArticleSlugsSucceed(articles));
    } catch (e) {
        yield put(articleActions.responseAllArticleSlugsFailed());
        yield put(pageLoadingActions.stopPageLoading());
    }
}
