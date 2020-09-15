export const constants = {
    REQUEST_AUTHENTICATE: 'REQUEST_AUTHENTICATE',
    RESPONSE_AUTHENTICATE_LOGGED: 'RESPONSE_AUTHENTICATE_LOGGED',
    RESPONSE_AUTHENTICATE_NOT_LOGGED: 'RESPONSE_AUTHENTICATE_NOT_LOGGED',

    REQUEST_LOGIN: 'REQUEST_LOGIN',
    RESPONSE_LOGIN_SUCCESS: 'RESPONSE_LOGIN_SUCCESS',
    RESPONSE_LOGIN_ERROR: 'RESPONSE_LOGIN_ERROR',

    REQUEST_LOGOUT: 'REQUEST_LOGOUT',
    RESPONSE_LOGOUT_SUCCESS: 'RESPONSE_LOGOUT_SUCCESS',
    RESPONSE_LOGOUT_ERROR: 'RESPONSE_LOGOUT_ERROR',

    REQUEST_CHALLENGE: 'REQUEST_CHALLENGE',
    RESPONSE_CHALLENGE_SUCCESS: 'RESPONSE_CHALLENGE_SUCCESS',
    RESPONSE_CHALLENGE_ERROR: 'RESPONSE_CHALLENGE_ERROR',

    REQUEST_COMPLETE_NEW_PASSWORD: 'REQUEST_COMPLETE_NEW_PASSWORD',
    RESPONSE_COMPLETE_NEW_PASSWORD_SUCCESS: 'RESPONSE_COMPLETE_NEW_PASSWORD_SUCCESS',
    RESPONSE_COMPLETE_NEW_PASSWORD_ERROR: 'RESPONSE_COMPLETE_NEW_PASSWORD_ERROR',

    REQUEST_FORGOT_PASSWORD: 'REQUEST_FORGOT_PASSWORD',
    RESPONSE_FORGOT_PASSWORD_SUCCESS: 'RESPONSE_FORGOT_PASSWORD_SUCCESS',
    RESPONSE_FORGOT_PASSWORD_ERROR: 'RESPONSE_FORGOT_PASSWORD_ERROR',

    REQUEST_FORGOT_PASSWORD_SUBMIT: 'REQUEST_FORGOT_PASSWORD_SUBMIT',
    RESPONSE_FORGOT_PASSWORD_SUBMIT_SUCCESS: 'RESPONSE_FORGOT_PASSWORD_SUBMIT_SUCCESS',
    RESPONSE_FORGOT_PASSWORD_SUBMIT_ERROR: 'RESPONSE_FORGOT_PASSWORD_SUBMIT_ERROR',
};

export const actions = {
    requestAuthenticate: (currentPath) => ({type: constants.REQUEST_AUTHENTICATE, payload: {currentPath}}),
    responseAuthenticateLogged: (authUser, pathBeforeAuthenticate) => ({type: constants.RESPONSE_AUTHENTICATE_LOGGED, payload: {authUser, pathBeforeAuthenticate}}),
    responseAuthenticateNotLogged: (authUser, pathBeforeAuthenticate) => ({type: constants.RESPONSE_AUTHENTICATE_NOT_LOGGED, payload: {authUser, pathBeforeAuthenticate}}),

    requestLogin: (email, password) => ({type: constants.REQUEST_LOGIN, payload: {email, password}}),
    responseLoginSuccess: (authUser) => ({type: constants.RESPONSE_LOGIN_SUCCESS, payload: {authUser}}),
    responseLoginError: (authUser) => ({type: constants.RESPONSE_LOGIN_ERROR, payload: {authUser}}),

    requestLogout: () => ({type: constants.REQUEST_LOGOUT, payload: {}}),
    responseLogoutSuccess: () => ({type: constants.RESPONSE_LOGOUT_SUCCESS, payload: {}}),
    responseLogoutError: (authUser) => ({type: constants.RESPONSE_LOGOUT_ERROR, payload: {authUser}}),

    requestChallenge: (authUser, challengeName) => ({type: constants.REQUEST_CHALLENGE, payload: {authUser, challengeName}}),
    responseChallengeSuccess: () => ({type: constants.RESPONSE_CHALLENGE_SUCCESS, payload: {}}),
    responseChallengeError: () => ({type: constants.RESPONSE_CHALLENGE_ERROR, payload: {}}),

    requestCompleteNewPassword: (user, password, requiredAttributes = {}) => ({
        type: constants.REQUEST_COMPLETE_NEW_PASSWORD,
        payload: {
            user: user,
            password: password,
            requiredAttributes: requiredAttributes
        }
    }),
    responseCompleteNewPasswordSuccess: (authUser) => ({type: constants.RESPONSE_COMPLETE_NEW_PASSWORD_SUCCESS, payload: {authUser}}),
    responseCompleteNewPasswordError: () => ({type: constants.RESPONSE_COMPLETE_NEW_PASSWORD_ERROR, payload: {}}),

    requestForgotPassword: (email) => ({type: constants.REQUEST_FORGOT_PASSWORD, payload: {email}}),
    responseForgotPasswordSuccess: () => ({type: constants.RESPONSE_FORGOT_PASSWORD_SUCCESS, payload: {}}),
    responseForgotPasswordError: () => ({type: constants.RESPONSE_FORGOT_PASSWORD_ERROR, payload: {}}),

    requestForgotPasswordSubmit: (email, code, password) => ({type: constants.REQUEST_FORGOT_PASSWORD_SUBMIT, payload: {email, code, password}}),
    responseForgotPasswordSubmitSuccess: () => ({type: constants.RESPONSE_FORGOT_PASSWORD_SUBMIT_SUCCESS, payload: {}}),
    responseForgotPasswordSubmitError: () => ({type: constants.RESPONSE_FORGOT_PASSWORD_SUBMIT_ERROR, payload: {}}),
};
