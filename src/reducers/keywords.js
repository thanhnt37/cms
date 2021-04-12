import {constants} from '../actions/keywords';

const _ = require('lodash');
const initState = {
    index: {
        Count: 0,
        ScannedCount: 0,
        Items: [],
        LastEvaluatedKey: {},
    }
};

export default (state = initState, action) => {

    switch (action.type) {
        case constants.RESPONSE_GET_ALL_KEYWORDS_SUCCEED:
            return {
                ...state,
                index: action.payload.keywords
            };

        default:
            return state;
    }
}
