export const constants = {
    REQUEST_S3_POLICY: 'REQUEST_S3_POLICY',
    RESPONSE_S3_POLICY_SUCCESS: 'RESPONSE_S3_POLICY_SUCCESS',
    RESPONSE_S3_POLICY_FAILED: 'RESPONSE_S3_POLICY_FAILED',
};

export const actions = {
    requestS3Policy: (startsWith) => ({type: constants.REQUEST_S3_POLICY, payload: {startsWith}}),
    responseS3PolicySuccess: (policy) => ({type: constants.RESPONSE_S3_POLICY_SUCCESS, payload: {policy}}),
    responseS3PolicyFailed: () => ({type: constants.RESPONSE_S3_POLICY_FAILED, payload: {}}),
};
