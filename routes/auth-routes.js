import express from 'express'
import { 
    clearRefreshTokenCookieController, 
    getTokenByRefreshTokenController, 
    otpGenerateController, 
    userLoginController 
} from '../controllers/auth-controllers.js'
import dotenv from'dotenv'
dotenv.config()

const router = express.Router()

router.post('/login', userLoginController )

router.get('/refreshToken', getTokenByRefreshTokenController )

router.delete('/refreshToken', clearRefreshTokenCookieController )

router.post( '/otp/generate', otpGenerateController)

export default router