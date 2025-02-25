import { psqlFunctionCaller, timeLogger } from "spooky-node"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwtTokenGenerator } from "../utils/jwt-helper.js"
import { getUserDetailByEmailModel, loginWithEmailModel } from "../models/auth-models.js"
import dotenv from'dotenv'
import { transporter } from "../configs/nodemailer-config.js"
import { generateOTPDigits } from "../utils/otp-digits-generator.js"
import { OTP_storageInserter, OTP_storageRemover, OTP_viewer } from "../storage/otp-storage.js"
dotenv.config()

export const userLoginController = async ( req, res ) => {
    try {
        timeLogger({incident: 'Login Attempt'})
        console.log('Login attempt with payload: ', req.body)
        const { email, password } = req.body

        const queryResult = await psqlFunctionCaller(loginWithEmailModel(email))

        const { risverified, rpassword, msg, code } = queryResult.rows[0]
        console.log('Query Returns', queryResult.rows[0])

        if (code === 2000){
            const validPassword = await bcrypt.compare(password, rpassword)
            if (!validPassword){
                timeLogger({incident: 'Login Fail'})
                return res.status(401).json({error: 'Incorrect Password!'})
            }

            timeLogger({incident: 'Login Success'})
            if (validPassword == true) {
                timeLogger({ incident: 'Get user detail' })
                if ( risverified == false ){
                    return res.status(200).json({msg, code, risverified})
                }
                const userDetail = await psqlFunctionCaller(getUserDetailByEmailModel(email))

                if (userDetail.rows[0].code == 2000){
                    const {
                        remailid,
                        ruserid,
                        rusername,
                        rfirstname,
                        rlastname,
                        msg,
                        code
                    } = userDetail.rows[0]
                    let tokens = jwtTokenGenerator({
                        email: remailid,
                        userId: ruserid,
                        userName: rusername,
                        firstName: rfirstname,
                        lastName: rlastname
                    })
                    res.cookie( 'refreshToken', tokens.refreshToken, { httpOnly: true })
                    res.status(200).json({msg, code, ...tokens})
                    console.log('Tokens generated for', rusername, tokens)
                    timeLogger({ incident: 'Tokens Generated' })
                } else {
                    res.status(401).json({msg,code})
                    timeLogger({incident: 'Login Fail'})
                }
            }
        } else {
            res.status(401).json({msg,code})
            timeLogger({incident: 'Login Fail'})
        }

    } catch (error) {
        res.status(500).json({error})
        timeLogger({incident: 'Neura returns error'})
    }
}

export const getTokenByRefreshTokenController = ( req, res ) => {
    try {
        timeLogger({ incident:'refreshToken applied for regenerate tokens' })
        const refreshToken = req.cookies.refreshToken
        if( refreshToken === null ){
            timeLogger({ incident: 'Token generation failed'})
            return res.status(401).json({ error: 'Token is missing' })
        }
        jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET, ( error, user ) => {
            if( error ) return res.status(403).json({ error })
            let tokens = jwtTokenGenerator( user )
            res.cookie( 'refreshToken', tokens.refreshToken, { httpOnly: true })
            res.status(200).json({ msg: 'Token regenerated!', code: 2101 , ...tokens })
            timeLogger({ incident: 'Tokens generated' })
        })
    } catch (error) {
        res.status(500).json({error})
        timeLogger({incident: 'Neura returns error'})
    }
}

export const clearRefreshTokenCookieController = ( req, res ) => {
    try {
        timeLogger({ incident: 'Trying for remove refreshToken'})
        res.clearCookie( 'refreshToken' )
        timeLogger({ incident: 'Refresh token removed' })
        return res.status(200).json({ message: 'Refresh Token Cleared!', code: 2102})
    } catch (error) {
        res.status(500).json({error})
        timeLogger({incident: 'Neura returns error'})
    }
} 

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
            res.status(401).json({ msg: 'This email is not registered.', code: 1404 })
        } else {
            let otp = otpObject.otp
            if( otp === req.body.otp ){
                timeLogger({ incident: 'OTP verification success' })
                res.status(200).json({ msg: 'OTP Verified.', code: 2000 })
                OTP_storageRemover(req.body.mail)
            } else {
                timeLogger({ incident: 'OTP verification failed' })
                res.status(401).json({ msg: 'OTP Mismatched.', code: 1401 })
            }
        }
    } catch (error) {
        res.status(500).json({error})
        console.log('Error on OTP verification', error)
        timeLogger({incident: 'Neura returns error'})
    }
}