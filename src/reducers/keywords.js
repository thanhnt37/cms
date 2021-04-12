import {constants} from '../actions/keywords';

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

        case constants.RESPONSE_CREATE_NEW_KEYWORD_SUCCEED:
            return {
                ...state,
                index: {
                    Count: state.index.Count + 1,
                    ScannedCount: state.index.ScannedCount + 1,
                    Items: [
                        action.payload.keyword,
                        ...state.index.Items
                    ],
                    LastEvaluatedKey: state.index.LastEvaluatedKey,
                }
            };


        case constants.RESPONSE_GET_ALL_KEYWORDS_SUCCEED:
            return {
                ...state,
                index: action.payload.keywords
            };

        default:
            return state;
    }
}
