import { psqlFunctionCaller, timeLogger } from "spooky-node"
import { generalResponseModel } from "../models/response-models.js"
import { minioClient, minioConfig } from "../configs/minio-config.js"
import { dirname } from "path"
import { fileURLToPath } from "url"
import fs from 'fs'
import { addNewImage, getImageList, imageUploaded } from "../models/img-models.js"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { GetObjectAclCommand, GetObjectCommand, PutObjectAclCommand, PutObjectCommand } from "@aws-sdk/client-s3"

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
        try {
            const url = await getSignedUrl( 
                minioClient, 
                new PutObjectCommand({ Bucket: "pichub-user-uploads", Key: `${imagePath}/${addImageMeta.rows[0]?.newimageid}.jpg` }),
                { expiresIn: 5 * 60 }
            ).then(url => res.status(200).json(generalResponseModel({code:2110, url, imageId:addImageMeta.rows[0]?.newimageid}))
            ).catch(err => res.status(401).json(generalResponseModel({code: 1110, err})))
        } catch (err) {
            return res.status(401).json(generalResponseModel({code: 1110, err}))
        }
    } catch (error) {
        res.status(500).json(generalResponseModel({code: 1500, error}))
        console.log('Error on image uploading.', error)
        timeLogger({incident: 'Neura returns error'})
    }
}

export const uploadSuccessController = async( req, res ) => {
    try {
        const { imageId } = req.body
        await psqlFunctionCaller(
            imageUploaded({imageId})
            ).then(imageIdRes => {
                if(imageIdRes.rows[0].rimagaeid > 0) {
                    res.status(200).json(generalResponseModel({code:2112, imageId: imageIdRes.rows[0].rimagaeid}))
                    timeLogger({incident:  `Image table update for ${imageId} success`})
                } else {
                    res.status(404).json(generalResponseModel({code: 1112, err}))
                    timeLogger({incident:  `Image table update for ${imageId} fail [image not found]`})
                }
        }).catch(err => {
            res.status(401).json(generalResponseModel({code: 1112, err}))
            timeLogger({incident:  `Image table update for ${imageId} fail`})
            console.log(err)
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

export const getCommonGalleryController = async( req, res ) => {
    try {
        timeLogger({incident: "Public gallery requested"})
        const { searchKey, limit, offset} = req.body
        console.log('Public Gallery for ', req.body)
        const imageList = await psqlFunctionCaller(getImageList({searchKey,limit,offset}))
        let gallery = []
        for (let i = 0; i < imageList.rows.length; i++ ){
            let imageBucketPath = `${imageList.rows[i].outimagepath}/${imageList.rows[i].outimageid}.jpg` 
            try {
                const url = await getSignedUrl( 
                    minioClient, 
                    new GetObjectCommand({ Bucket: "pichub-user-uploads", Key: imageBucketPath}),
                    { expiresIn: 5 * 60 }
                ).then(url => {
                    gallery.push({
                        imageSrc:url,
                        uploadedBy: imageList.rows[i].outuploadedby,
                        likes: imageList.rows[i].outlikes,
                        description: imageList.rows[i].outdescription,
                        tastes: imageList.rows[i].outtastes,
                        count: imageList.rows[i].outcount
                    })
                }).catch(err => res.status(401).json(generalResponseModel({code: 1111, err})))
            } catch (err) {
                return res.status(401).json(generalResponseModel({code: 1111, err}))
            }
        }
        console.log('Gallery responded --->',gallery.length,'images')
        timeLogger({incident: "Public gallery responded"})
        res.status(200).json(generalResponseModel({code:2111, gallery}))
    } catch (error) {
        res.status(500).json(generalResponseModel({code: 1500, error}))
        console.log('Error on gallery listing.', error)
        timeLogger({incident: 'Neura returns error'})
    }
}