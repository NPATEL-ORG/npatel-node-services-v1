import { timeLogger } from "spooky-node"
import { generalResponseModel } from "../models/response-models.js"
import { minioClient, minioConfig } from "../configs/minio-config.js"
import { dirname } from "path"
import { fileURLToPath } from "url"
import fs from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const uploadController = async ( req, res ) => {  //not going to use this this will keep a simple image to hold there.
    try {
        console.log(__dirname.split('controllers')[0]+'storage\\image-temp')    
        var fileName = req.files.image.name
        var receivedFile = req.files.image
        var uploadPath = __dirname.split('controllers')[0] + 'storage\\image-temp\\' + fileName
        await receivedFile.mv(uploadPath, async function(err) {
            if (err){
                return res.status(502).json({err});
            }
            var sourceFile = `./storage/image-temp/${fileName}`
            var destinationObject = 'customUpload/uploadedImg.img'
            const upRes = await minioClient.fPutObject( minioConfig.bucket , destinationObject, sourceFile, minioConfig.imgMetaData)
            console.log('File ' + sourceFile + ' uploaded as object ' + destinationObject + ' in bucket ' + minioConfig.bucket)
            fs.unlink(uploadPath, (err) => {
                if (err) {
                  console.error(`Error removing file: ${err}`);
                  return;
                }
            })
            res.status(200).json({status: upRes})
        });
    } catch (error) {
        res.status(500).json(generalResponseModel({code: 1500, error}))
        console.log('Error on image uploading.', error)
        timeLogger({incident: 'Neura returns error'})
    }
}

export const uploadPreSignURLController = ( req, res ) => {
    try {
        minioClient.presignedPutObject('pichub-user-uploads', `image/${req.body.name}`, 5 * 60, (err, url) => {
            if (err) { res.status(401).json(generalResponseModel({code: 1110, err})) }
            res.status(200).json(generalResponseModel({code:2110, url}))
        })
    } catch (error) {
        res.status(500).json(generalResponseModel({code: 1500, error}))
        console.log('Error on image uploading.', error)
        timeLogger({incident: 'Neura returns error'})
    }
}

export const viewPreSignURLController = ( req, res ) => {
    try {
        minioClient.presignedGetObject('pichub-user-uploads', `image/${req.body.name}`, 60, (err, url) => {
            if (err) { res.status(401).json(generalResponseModel({code: 1110, err})) }
            res.status(200).json(generalResponseModel({code:2110, url}))
        })
    } catch (error) {
        res.status(500).json(generalResponseModel({code: 1500, error}))
        console.log('Error on image uploading.', error)
        timeLogger({incident: 'Neura returns error'})
    }
}