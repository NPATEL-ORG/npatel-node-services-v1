import * as Minio from 'minio'
import dotenv from'dotenv'
dotenv.config()

export const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: process.env.MINIO_PORT,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
})

export const minioConfig = {
    bucket:'pichub-assets-img',
    imgMetaData: {
        'Content-Type': 'image/jpeg'
    }
}