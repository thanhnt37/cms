import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import { authenticate } from './authenticate';
import articles from './articles';
import s3 from './s3';

export function* rootSaga() {
    yield all([
        ...authenticate,
        ...articles,
        ...s3
    ]);
}

export default createSagaMiddleware();
