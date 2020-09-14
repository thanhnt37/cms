import {constants} from '../actions/globalMessages';
const _ = require('lodash');

const initState = {
    type: '', // success || info || warning || error
    message: ''
};

export default (state = initState, action) => {
    switch (action.type) {
        case constants.NEW_MESSAGE:
            if(!_.isEmpty(action.payload.type) && !_.isEmpty(action.payload.message)) {
                return action.payload;
            }
            return state;

        case constants.RESET_ALL_MESSAGE:
            return initState;

        default:
            return state;
    }

}
