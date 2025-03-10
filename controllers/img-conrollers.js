import { timeLogger } from "spooky-node"
import { generalResponseModel } from "../models/response-models.js"

export const uploadController = ( req, res ) => {
    try {
        console.log(req.body)
        res.status(200).json({req: req.body})
    } catch (error) {
        res.status(500).json(generalResponseModel({code: 1500, error}))
        console.log('Error on image uploading.', error)
        timeLogger({incident: 'Neura returns error'})
    }
} 