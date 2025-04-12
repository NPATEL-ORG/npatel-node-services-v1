import { S3Client } from "@aws-sdk/client-s3"
import dotenv from'dotenv'
dotenv.config()

export const S3 = new S3Client({
    region: "eu-west-2",
    endpoint: `https://s3.npatelgroup.ltd`,
    credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY,
        secretAccessKey: process.env.MINIO_SECRET_KEY,
    },
    forcePathStyle:'true'
});