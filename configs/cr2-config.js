import { S3Client } from "@aws-sdk/client-s3"
import dotenv from'dotenv'
dotenv.config()

export const S3 = new S3Client({
    region: "apac",
    endpoint: `https://${process.env.CR2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.CR2_ACCESS_KEY_ID,
        secretAccessKey: process.env.CR2_SECRET_ACCESS_KEY,
    },
});