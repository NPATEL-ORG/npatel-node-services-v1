import { timeLogger } from "spooky-node"
import { generalResponseModel } from "../models/response-models.js"
import { minioClient, minioConfig } from "../configs/minio-config.js"

export const uploadController = async ( req, res ) => {
    try {
        var sourceFile = './controllers/test.jpg'
        var destinationObject = 'final/test-u2.img'
        const upRes = await minioClient.fPutObject( minioConfig.bucket , destinationObject, sourceFile, minioConfig.imgMetaData)
        console.log('File ' + sourceFile + ' uploaded as object ' + destinationObject + ' in bucket ' + minioConfig.bucket)
        res.status(200).json({status:upRes})
    } catch (error) {
        res.status(500).json(generalResponseModel({code: 1500, error}))
        console.log('Error on image uploading.', error)
        timeLogger({incident: 'Neura returns error'})
    }
}

export const preSignedURLController = ( req, res ) => {
    try {
        console.log(req.body)
        res.status(200).json({req: req.body})
    } catch (error) {
        res.status(500).json(generalResponseModel({code: 1500, error}))
        console.log('Error on image uploading.', error)
        timeLogger({incident: 'Neura returns error'})
    }
}