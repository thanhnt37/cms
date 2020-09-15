import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import { authenticate } from './authenticate';

export function* rootSaga() {
    yield all([
        ...authenticate
    ]);
}

export default createSagaMiddleware();
