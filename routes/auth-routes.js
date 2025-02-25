import express from 'express'
import { 
    clearRefreshTokenCookieController, 
    getTokenByRefreshTokenController, 
    otpGenerateController, 
    otpVerifyController, 
    userLoginController 
} from '../controllers/auth-controllers.js'
import dotenv from'dotenv'
dotenv.config()

const router = express.Router()

router.post('/login', userLoginController )

router.get('/refreshToken', getTokenByRefreshTokenController )

router.delete('/refreshToken', clearRefreshTokenCookieController )

router.post( '/otp/generate', otpGenerateController)

router.post( '/otp/verify', otpVerifyController )

export default router