const AWS = require('aws-sdk');

AWS.config = {
    region: process.env.REACT_APP_AWS_S3_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    },
    s3: {
        apiVersion: '2006-03-01',
        endpoint: `https://s3.${process.env.REACT_APP_AWS_S3_BUCKET_REGION}.amazonaws.com`,
    },
    dynamodb: {
        apiVersion: '2012-08-10',
        endpoint: "https://dynamodb.ap-southeast-1.amazonaws.com"
    }
};

export default AWS;
