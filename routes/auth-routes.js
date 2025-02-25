import express from 'express'
import { 
    clearRefreshTokenCookieController, 
    getTokenByRefreshTokenController,
    userLoginController 
} from '../controllers/auth-controllers.js'

const router = express.Router()

router.post('/login', userLoginController )

router.get('/refreshToken', getTokenByRefreshTokenController )

router.delete('/refreshToken', clearRefreshTokenCookieController )


export default router