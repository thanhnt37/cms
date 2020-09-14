import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

export function* rootSaga() {
    yield all([]);
}

export default createSagaMiddleware();
