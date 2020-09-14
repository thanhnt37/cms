import {constants} from '../actions/leftMenu';

export default (state = {visible: false}, action) => {
    switch (action.type) {
        case constants.OPEN_LEFT_MENU:
            return {visible: true};

        case constants.CLOSE_LEFT_MENU:
            return {visible: false};

        default:
            return state;
    }
}