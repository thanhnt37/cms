export const constants = {
    OPEN_LEFT_MENU: 'OPEN_LEFT_MENU',
    CLOSE_LEFT_MENU: 'CLOSE_LEFT_MENU',
};

export const actions = {
    openLeftMenu: () => ({type: constants.OPEN_LEFT_MENU, payload: {}}),
    closeLeftMenu: () => ({type: constants.CLOSE_LEFT_MENU, payload: {}}),
};