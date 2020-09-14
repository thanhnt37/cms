export const constants = {
    START_PAGE_LOADING: 'START_PAGE_LOADING',
    STOP_PAGE_LOADING: 'STOP_PAGE_LOADING',
};

export const actions = {
    startPageLoading: () => ({type: constants.START_PAGE_LOADING, payload: {}}),
    stopPageLoading: () => ({type: constants.STOP_PAGE_LOADING, payload: {}}),
};
