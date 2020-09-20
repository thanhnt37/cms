import { put, call, throttle } from 'redux-saga/effects';

import { constants as s3Constants, actions as s3Actions } from '../actions/s3';
import * as s3Services from '../services/s3';

const _ = require('lodash');

export default [
    throttle(3000, s3Constants.REQUEST_S3_POLICY, createPresignedPost),
];

function* createPresignedPost({payload, type}) {
    try {
        const response = yield call(s3Services.createPresignedPost, payload.startsWith);

        yield put(s3Actions.responseS3PolicySuccess(response));
    } catch (e) {
        yield put(s3Actions.responseS3PolicyFailed());
    }
}
