import { psqlFunctionCaller, timeLogger } from "spooky-node"
import { generalResponseModel } from "../models/response-models.js"
import { minioClient, minioConfig } from "../configs/minio-config.js"
import { dirname } from "path"
import { fileURLToPath } from "url"
import fs from 'fs'
import { addNewImage, getImageList } from "../models/img-models.js"

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

export const uploadPreSignURLController = async( req, res ) => {
    try {
        const { imageName, description, uploadedBy, tastes } = req.body
        const imagePath = `image/${uploadedBy}`
        const addImageMeta = await psqlFunctionCaller(addNewImage({imageName,imagePath,description,tastes,uploadedBy}))
        await minioClient.presignedPutObject('pichub-user-uploads', `${imagePath}/${addImageMeta.rows[0]?.newimageid}.jpg`, 5 * 60, (err, url) => {
            if (err) { return res.status(401).json(generalResponseModel({code: 1110, err})) }
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
            if (err) { res.status(401).json(generalResponseModel({code: 1111, err})) }
            res.status(200).json(generalResponseModel({code:2111, url}))
        })
    } catch (error) {
        res.status(500).json(generalResponseModel({code: 1500, error}))
        console.log('Error on image uploading.', error)
        timeLogger({incident: 'Neura returns error'})
    }
}

export const getCommonGallery = async( req, res ) => {
    try {
        timeLogger({incident: "Public gallery requested"})
        const { searchKey, limit, offset} = req.body
        console.log('Public Gallery for ', req.body)
        const imageList = await psqlFunctionCaller(getImageList({searchKey,limit,offset}))
        let gallery = []
        for (let i = 0; i < imageList.rows.length; i++ ){
            let imageBucketPath = `${imageList.rows[i].outimagepath}/${imageList.rows[i].outimageid}.jpg` 
            console.log(imageBucketPath)
            await minioClient.presignedGetObject('pichub-user-uploads', imageBucketPath, 60, (err, url) => {
                if (err) { res.status(401).json(generalResponseModel({code: 1111, err})) }
                gallery.push({
                    imageSrc:url,
                    uploadedBy: imageList.rows[i].outuploadedby,
                    likes: imageList.rows[i].outlikes,
                    description: imageList.rows[i].outdescription,
                    tastes: imageList.rows[i].outtastes,
                    count: imageList.rows[i].outcount
                })
            })
        }
        console.log('Gallery responded --->',gallery)
        timeLogger({incident: "Public gallery responded"})
        res.status(200).json(generalResponseModel({code:2111, gallery}))
    } catch (error) {
        res.status(500).json(generalResponseModel({code: 1500, error}))
        console.log('Error on gallery listing.', error)
        timeLogger({incident: 'Neura returns error'})
    }
}