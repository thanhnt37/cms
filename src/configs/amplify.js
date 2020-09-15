export default {
    Auth: {
        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        // identityPoolId: process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID || 'REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID',

        // REQUIRED - Amazon Cognito Region
        region: process.env.REACT_APP_AWS_COGNITO_REGION || 'REACT_APP_AWS_COGNITO_REGION',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID || 'REACT_APP_AWS_COGNITO_USER_POOL_ID',

        // OPTIONAL - Amazon Cognito Web Client ID
        userPoolWebClientId: process.env.REACT_APP_AWS_COGNITO_APP_CLIENT_ID || 'REACT_APP_AWS_COGNITO_APP_CLIENT_ID',

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_SRP_AUTH'
    }
}