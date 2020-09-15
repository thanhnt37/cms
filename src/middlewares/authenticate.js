import { put, call, throttle, takeEvery } from 'redux-saga/effects';

import { constants as authenticateConstants, actions as authenticateActions } from '../actions/authenticate';
import { actions  as globalMessageActions } from '../actions/globalMessages';
import { amplifyServices } from '../services/amplify';

export const authenticate = [
    takeEvery(authenticateConstants.REQUEST_AUTHENTICATE, getCurrentUser),
    throttle(3000, authenticateConstants.REQUEST_LOGIN, login),
    takeEvery(authenticateConstants.REQUEST_LOGOUT, logout),
    throttle(3000, authenticateConstants.REQUEST_COMPLETE_NEW_PASSWORD, completeNewPassword),
    throttle(3000, authenticateConstants.REQUEST_FORGOT_PASSWORD, forgotPassword),
    throttle(3000, authenticateConstants.REQUEST_FORGOT_PASSWORD_SUBMIT, forgotPasswordSubmit),
];

function* getCurrentUser({payload, type}) {
    try {
        const currentUser = yield call(amplifyServices.currentAuthenticatedUser);
        yield put(authenticateActions.responseAuthenticateLogged(currentUser, payload.currentPath));
    } catch (e) {
        yield put(authenticateActions.responseAuthenticateNotLogged(false, payload.currentPath));
    }
}

/**
 * TODO: cần thêm system notify để show các thông báo thành công hay thất bại
 **/
function* login({payload, type}) {
    try {
        const user = yield call(amplifyServices.login, ...[payload.email, payload.password]);

        if (user.challengeName) {
            yield put(authenticateActions.requestChallenge(user, user.challengeName));
            yield put(globalMessageActions.newWarningMessage("You must change your password before accessing the system !"));
        } else {
            yield put(authenticateActions.responseLoginSuccess(user));
            yield put(globalMessageActions.newSuccessMessage("Hello, Welcome You Come Back !"));
        }
    } catch(e) {
        yield put(authenticateActions.responseLoginError(false));
        yield put(globalMessageActions.newErrorMessage(e.message));
    }
}

function* logout({payload, type}) {
    try {
        yield call(amplifyServices.logout);
        yield put(authenticateActions.responseLogoutSuccess());
        yield put(globalMessageActions.newSuccessMessage("Good Bye, See You Later !"));
    } catch(e) {
        yield put(authenticateActions.responseLogoutError(false));
    }
}

function* completeNewPassword({payload, type}) {
    try {
        yield call(amplifyServices.completeNewPassword, payload.user, payload.password, payload.requiredAttributes);
        const user = yield call(amplifyServices.currentAuthenticatedUser);

        yield put(authenticateActions.responseCompleteNewPasswordSuccess(user));
        yield put(globalMessageActions.newSuccessMessage("Successfully, Welcome You Access the System !"));
    } catch(e) {
        yield put(authenticateActions.responseCompleteNewPasswordError());
        yield put(globalMessageActions.newErrorMessage(e.message));
    }
}

function* forgotPassword({payload, type}) {
    try {
        yield call(amplifyServices.forgotPassword, payload.email);

        yield put(authenticateActions.responseForgotPasswordSuccess());
    } catch(e) {
        yield put(authenticateActions.responseForgotPasswordError());
        yield put(globalMessageActions.newErrorMessage(e.message));
    }
}

function* forgotPasswordSubmit({payload, type}) {
    try {
        yield call(amplifyServices.forgotPasswordSubmit, payload.email, payload.code, payload.password);

        yield put(authenticateActions.responseForgotPasswordSubmitSuccess());
    } catch(e) {
        yield put(authenticateActions.responseForgotPasswordSubmitError());
        yield put(globalMessageActions.newErrorMessage(e.message));
    }
}