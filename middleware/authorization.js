import jwt from 'jsonwebtoken'
import dotenv from'dotenv'
dotenv.config()

const authenticateToken = ( req, res, next ) => {
    const authHeader = req.headers['authorization']
    console.log('sss-->', authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    if ( token == null ) return res.status(401).json({error: 'Unauthorized without token!'})
    jwt.verify( token, process.env.ACCESS_TOKEN_SECRET, ( error, user ) => {
        if ( error ) return res.status(403).json({error: error});
        req.user = user;
        next();
    })
}

export { authenticateToken }