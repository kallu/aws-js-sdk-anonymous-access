import {
    S3
} from "@aws-sdk/client-s3";

export function ListBucket(list: string, bucket: string, prefix: string, region: string) {

    // Initialize an S3 service with credentials for our identity pool.
    const s3 = new S3({
        region: region,
        signer: {
            sign: async (request) => request
        }
        //credentials: fromCognitoIdentityPool({
        //  client: new CognitoIdentityClient({ region: region }),
        //  identityPoolId: identityPoolId,
        //}),
    });

    // List objects in the bucketa
    const params = {
        Bucket: bucket,
        Delimiter: '/',
        Prefix: prefix
    }

    var listing = document.getElementById(list);
    s3.listObjectsV2(params, function(err, data) {
        if (err) console.log(err, err.stack);
        console.log(data);
        data.Contents.forEach((obj) => {
            listing.innerHTML += "<tr><td>" + obj.Key + "</td><td>" + obj.Size + "</td><td>" + obj.StorageClass + "</td></tr>";
        });
    });
};
