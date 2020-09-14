export const constants = {
    NEW_MESSAGE: 'NEW_MESSAGE',
    RESET_ALL_MESSAGE: 'RESET_ALL_MESSAGE'
};

export const actions = {
    newSuccessMessage: (message) => ({type: constants.NEW_MESSAGE, payload: {type: 'success', message}}),
    newInfoMessage: (message) => ({type: constants.NEW_MESSAGE, payload: {type: 'info', message}}),
    newWarningMessage: (message) => ({type: constants.NEW_MESSAGE, payload: {type: 'warning', message}}),
    newErrorMessage: (message) => ({type: constants.NEW_MESSAGE, payload: {type: 'error', message}}),

    resetAllMessage: () => ({type: constants.RESET_ALL_MESSAGE, payload: {}}),
};
