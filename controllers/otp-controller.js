import { transporter } from "../configs/nodemailer-config.js"
import { generateOTPDigits } from "../utils/otp-digits-generator.js"
import { OTP_storageInserter, OTP_storageRemover, OTP_viewer } from "../storage/otp-storage.js"
import dotenv from 'dotenv'
import { psqlFunctionCaller, timeLogger } from "spooky-node"
import { verifyEmailModel } from "../models/otp-models.js"
dotenv.config()

export const otpGenerateController = async( req, res ) => {
    try {
        timeLogger({ incident: 'Generate OTP on request' })
        let generatedOTP = generateOTPDigits( { excludeThis : [ '1111', '1619', '0001' ] } )
        OTP_storageInserter({ email: req.body.email, otp: generatedOTP })
        transporter.sendMail({
            from: '"PicHub" <no-reply.pichub@auth.npatel.co.uk>',
            to: req.body.email,
            subject: "OTP Verification for user registration on NPATEL",
            html:`<html><h1>OTP for PicHub User Registration</h1><p>Your OTP is ${ generatedOTP }</p></html>`
        }, ( err, data ) => {
            if (err){
                res.status(501).json({error : err})
                timeLogger({incident: 'Neura returns error'})
            } else {
                console.log(`OTP generated for ${ req.body.email } : ${ generatedOTP }`)
                res.status(200).json({ msg: data })
                timeLogger({ incident: 'OTP Sent' })
            }
        })
    } catch (error) {
        res.status(500).json({error})
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
            res.status(401).json({ msg: 'Request for OTP first!', code: 1409 })
        } else {
            let otp = otpObject.otp
            if( otp === req.body.otp ){
                timeLogger({ incident: 'OTP verification success' })
                OTP_storageRemover(req.body.mail)
                const verification = await psqlFunctionCaller(verifyEmailModel({ email: req.body.email, verify: true }))
                res.status(200).json( verification.rows[0] )
            } else {
                timeLogger({ incident: 'OTP verification failed' })
                res.status(401).json({ msg: 'OTP Mismatched.', code: 1201 })
            }
        }
    } catch (error) {
        res.status(500).json({error})
        console.log('Error on OTP verification', error)
        timeLogger({incident: 'Neura returns error'})
    }
}