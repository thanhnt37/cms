import {constants} from '../actions/s3';

export default (state = {}, action) => {
    switch (action.type) {
        case constants.RESPONSE_S3_POLICY_SUCCESS:
            return action.payload.policy;

        default:
            return state;
    }
}
