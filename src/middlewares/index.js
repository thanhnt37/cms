import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import { authenticate } from './authenticate';
import articles from './articles';

export function* rootSaga() {
    yield all([
        ...authenticate,
        ...articles
    ]);
}

export default createSagaMiddleware();
