import { transporter } from "../configs/nodemailer-config.js"
import { generateOTPDigits } from "../utils/otp-digits-generator.js"
import { OTP_storageInserter, OTP_storageRemover, OTP_viewer } from "../storage/otp-storage.js"
import dotenv from 'dotenv'
import { psqlFunctionCaller, timeLogger } from "spooky-node"
import { verifyEmailModel } from "../models/otp-models.js"
import { excludedOTPs } from "../configs/admins-config.js"
import { generalResponseModel } from "../models/response-models.js"
import { mailTemplate } from "../views/otpMailTemplates/email-template.js"
dotenv.config()

export const otpGenerateController = async( req, res ) => {
    try {
        timeLogger({ incident: 'Generate OTP on request' })
        let generatedOTP = generateOTPDigits( { excludeThis : excludedOTPs } )
        OTP_storageInserter({ email: req.body.email, otp: generatedOTP })
        transporter.sendMail({
            from: '"PicHub" <no-reply.pichub@auth.npatel.co.uk>',
            to: req.body.email,
            subject: "OTP Verification for user registration on NPATEL",
            html: mailTemplate({name: req.body.email, otp:generatedOTP})
        }, ( err, data ) => {
            if (err){
                res.status(501).json(generalResponseModel({code: 1106, error : err}))
                timeLogger({incident: 'Neura returns error'})
            } else {
                console.log(`OTP generated for ${ req.body.email } : ${ generatedOTP }`)
                res.status(200).json(generalResponseModel({ code: 2104, message: data }))
                timeLogger({ incident: 'OTP Sent' })
            }
        })
    } catch (error) {
        res.status(500).json(generalResponseModel({code: 1500, error}))
        console.log('Error on OTP generation', error)
        timeLogger({incident: 'Neura returns error'})
    }
}

export const otpVerifyController = async( req, res ) => {
    try {
        timeLogger({ incident: 'OTP verification initiated' })
        const otpObject = OTP_viewer(req.body.email)
        if ( !otpObject ){
            timeLogger({ incident: 'Register this email first!' })
            res.status(401).json(generalResponseModel({ code: 1107 }))
        } else {
            let otp = otpObject.otp
            if( otp === req.body.otp ){
                timeLogger({ incident: 'OTP verification success' })
                OTP_storageRemover(req.body.mail)
                const verification = await psqlFunctionCaller(verifyEmailModel({ email: req.body.email, verify: true }))
                res.status(200).json(generalResponseModel({ code: 2105 }))
            } else {
                timeLogger({ incident: 'OTP verification failed' })
                res.status(401).json(generalResponseModel({code: 1108}))
            }
        }
    } catch (error) {
        res.status(500).json(generalResponseModel({code: 1500, error}))
        console.log('Error on OTP verification', error)
        timeLogger({incident: 'Neura returns error'})
    }
}