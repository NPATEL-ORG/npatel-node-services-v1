import * as Minio from 'minio'
import dotenv from'dotenv'
dotenv.config()

export const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: process.env.MINIO_PORT,
    useSSL: true,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    region: 'us-east-1'
})

export const minioConfig = {
    bucket:'pichub-assets-img',
    imgMetaData: {
        'Content-Type': 'image/jpeg'
    }
}