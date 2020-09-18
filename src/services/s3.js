import AWS from '../configs/aws';
const S3 = new AWS.S3();

export async function createPresignedPost(startsWith) {
    let params = {
        Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
        Conditions: [
            ['starts-with', '$key', startsWith + '-'],
            ["eq", "$acl", "public-read"],
            ['starts-with', '$success_action_status', 201],
            ['starts-with', '$x-requested-with', 'xhr'],
            ['starts-with', '$content-type', ''],
        ]
    };

    return new Promise((resolve, reject) => {
        S3.createPresignedPost(params, function(err, data) {
            if (err) {
                console.log(err);
                console.log('-------- parameter --------');
                console.log(params);
            } else {
                resolve(data);
            }
        });
    });
}

export async function putObject(bucket, key, body) {
    let params = {
        Bucket: bucket,
        Key   : key,
        ACL   : "public-read",
        ContentType: 'image/jpeg',
        Body  : body
    };

    return new Promise((resolve, reject) => {
        S3.putObject(params, function(err, data) {
            if (err) {
                console.log(err);
                console.log('-------- parameter --------');
                console.log(params);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
