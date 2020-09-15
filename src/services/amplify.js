import Amplify, { Auth } from 'aws-amplify';

import amplifyConfigs from "../configs/amplify";

Amplify.configure(amplifyConfigs);

export const amplifyServices = {
    login: (email, password) => Auth.signIn(email, password),
    logout: () => Auth.signOut(),
    currentAuthenticatedUser: () => Auth.currentAuthenticatedUser(),
    currentSession: () => Auth.currentSession(),
    completeNewPassword: (user, password, requiredAttributes = {}) => Auth.completeNewPassword(user, password, requiredAttributes),
    forgotPassword: (email) => Auth.forgotPassword(email),
    forgotPasswordSubmit: (email, code, password) => Auth.forgotPasswordSubmit(email, code, password),
};