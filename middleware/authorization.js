import jwt from 'jsonwebtoken'
import dotenv from'dotenv'
import { generalResponseModel } from '../models/response-models.js'
dotenv.config()

const authenticateToken = ( req, res, next ) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if ( token == null ) return res.status(401).json(generalResponseModel({error: 'Unauthorized without token!'}))
    jwt.verify( token, process.env.ACCESS_TOKEN_SECRET, ( error, user ) => {
        if ( error ) return res.status(403).json({error: error});
        req.user = user;
        next();
    })
}

export { authenticateToken }