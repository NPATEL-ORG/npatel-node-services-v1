import { timeLogger } from "spooky-node"
import { transporter } from "../configs/nodemailer-config"
import { generateOTPDigits } from "../utils/otp-digits-generator"

export const otpGenerateMiddleware = async( req, res, next ) => {
    try {
        timeLogger({ incident: 'Generate OTP on signup' })
        let generatedOTP = generateOTPDigits( { excludeThis : [ '1111', '1619', '0001' ] } )
        const info = await transporter.sendMail({
            from: '"PicHub" <no-reply.pichub@auth.npatel.co.uk>',
            to: req.body.email,
            subject: "OTP Verification for user registration on NPATEL",
            html:`<html><h1>OTP for PicHub User Registration</h1><p>Your OTP is ${ generatedOTP }</p></html>`
        })
        console.log(`OTP generated on signup for ${ email } : ${ generatedOTP }`)
        timeLogger({ incident: 'OTP generated' })
        next()
    } catch (error) {
        res.status(500).json({error})
        timeLogger({incident: 'Neura returns error'})
    }
}