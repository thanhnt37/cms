import { constants as authenticateConstants } from '../actions/authenticate';
import { constants as globalMessageConstants } from '../actions/globalMessages';

const _ = require('lodash');
const initState = {
    authUser: null,
    pathBeforeAuthenticate: '/',

};
export default (state = initState, action) => {
    switch(action.type) {
        case authenticateConstants.RESPONSE_AUTHENTICATE_LOGGED:
            return {
                authUser: action.payload.authUser,
                pathBeforeAuthenticate: action.payload.pathBeforeAuthenticate
            };
        case authenticateConstants.RESPONSE_AUTHENTICATE_NOT_LOGGED:
            return {
                authUser: action.payload.authUser,
                pathBeforeAuthenticate: action.payload.pathBeforeAuthenticate
            };

        case authenticateConstants.RESPONSE_LOGIN_SUCCESS:
            return {
                authUser: action.payload.authUser,
                pathBeforeAuthenticate: state.pathBeforeAuthenticate
            };
        case authenticateConstants.RESPONSE_LOGIN_ERROR:
            return {
                authUser: false,
                pathBeforeAuthenticate: state.pathBeforeAuthenticate,
                hideLoading: true
            };
        case globalMessageConstants.DISPLAYED_ERROR_MESSAGE:
            // const authUser = (_.has(state, 'authUser.challengeName') && !_.isEmpty(state.authUser.challengeName)) ? state.authUser : false;
            const authUser = (_.has(state, 'authUser.username') && !_.isEmpty(state.authUser.username)) ? state.authUser : false;
            return {
                ...state,
                authUser: authUser,
                pathBeforeAuthenticate: state.pathBeforeAuthenticate,
            };
        case authenticateConstants.REQUEST_CHALLENGE:
            return {
                authUser: action.payload.authUser,
                pathBeforeAuthenticate: state.pathBeforeAuthenticate,
            };
        case authenticateConstants.RESPONSE_COMPLETE_NEW_PASSWORD_SUCCESS:
            return {
                authUser: action.payload.authUser,
                pathBeforeAuthenticate: state.pathBeforeAuthenticate,
            };
        case authenticateConstants.RESPONSE_COMPLETE_NEW_PASSWORD_ERROR:
            return {
                authUser: state.authUser,
                pathBeforeAuthenticate: state.pathBeforeAuthenticate,
                hideLoading: true
            };

        case authenticateConstants.RESPONSE_FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                forgotPasswordStep: 1
            };
        case authenticateConstants.RESPONSE_FORGOT_PASSWORD_SUBMIT_SUCCESS:
            return {
                ...state,
                forgotPasswordStep: 2
            };

        case authenticateConstants.RESPONSE_LOGOUT_SUCCESS:
            return {
                authUser: false,
                pathBeforeAuthenticate: initState.pathBeforeAuthenticate
            };

        default:
            return state;
    }
}