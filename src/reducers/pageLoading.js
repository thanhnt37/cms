import {constants} from '../actions/pageLoading';

const initState = false;

export default (state = initState, action) => {
    switch (action.type) {
        case constants.START_PAGE_LOADING:
            return true;

        case constants.STOP_PAGE_LOADING:
            return false;

        default:
            return state;
    }
}
