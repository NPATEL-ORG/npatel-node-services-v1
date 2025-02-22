import jwt from 'jsonwebtoken'
import dotenv from'dotenv'
dotenv.config()

const jwtTokenGenerator = ({ userId, userName, email, firstName, lastName }) => {
    const user = { userId, userName, email, firstName, lastName }
    const accessToken = jwt.sign( user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20s'} )
    const refreshToken = jwt.sign( user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1m'} )
    return ({accessToken, refreshToken})
}

export { jwtTokenGenerator }