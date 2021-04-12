import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import { authenticate } from './authenticate';
import articles from './articles';
import s3 from './s3';
import keywords from './keywords';

export function* rootSaga() {
    yield all([
        ...authenticate,
        ...articles,
        ...s3,
        ...keywords
    ]);
}

export default createSagaMiddleware();
