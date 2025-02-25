import { psqlFunctionCaller, timeLogger } from "spooky-node"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwtTokenGenerator } from "../utils/jwt-helper.js"
import { getUserDetailByEmailModel, loginWithEmailModel } from "../models/auth-models.js"
import dotenv from'dotenv'
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
