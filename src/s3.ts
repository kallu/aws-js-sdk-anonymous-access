import { S3 } from "@aws-sdk/client-s3";

export function fetchFromBucket(bucket: string, key: string) {
  const region = "eu-north-1";

  // Initialize an S3 service with credentials for our identity pool.
  const s3 = new S3({
    region: region,
    signer: { sign: async (request) => request }
    //credentials: fromCognitoIdentityPool({
    //  client: new CognitoIdentityClient({ region: region }),
    //  identityPoolId: identityPoolId,
    //}),
  });

  // Fetch and print out the object size
  s3.getObject(
    {
      Bucket: bucket,
      Key: key,
    },
    (err, data) => {
      if (err) {
        console.log(`Error when fetching from bucket: ${err.stack}`);
      } else {
        console.log(`Data fetched from bucket. Size: [${data.ContentLength}]`);
      }
    }
  );
}

