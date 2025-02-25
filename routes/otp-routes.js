import express from 'express'
import { otpGenerateController, otpVerifyController } from '../controllers/otp-controller.js'

const router = express.Router()

router.post( '/generate', otpGenerateController )

router.post( '/verify', otpVerifyController )

export default router