import express from 'express'
import { jwtTokenGenerator } from '../utils/jwt-helper.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { psqlFunctionCaller, timeLogger } from 'spooky-node'
import databaseConfig from '../configs/database-config.js'
import dotenv from'dotenv'
dotenv.config()

const router = express.Router()

router.post('/login', async( req, res ) => {
    try {
        timeLogger({incident: 'Login Attempt'})
        console.log('Login attempt with payload: ', req.body)
        const { email, password } = req.body

        const queryResult = await psqlFunctionCaller({
            schemaName: databaseConfig.schemaName,
            sqlFunctionName: databaseConfig.psqlFunction_login,
            poolConfig: databaseConfig.poolConfig,
            params: [email]
        })

        const { rpassword, msg, code } = queryResult.rows[0]
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
                const userDetail = await psqlFunctionCaller({
                    schemaName: databaseConfig.schemaName,
                    sqlFunctionName: databaseConfig.psqlFunction_getUserDetail,
                    poolConfig: databaseConfig.poolConfig,
                    params: [email]
                })
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
})

router.get('/refreshToken', ( req, res ) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if( refreshToken === null ){
            return res.status(401).json({ error: 'Token is missing' })
        }
        jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET, ( error, user ) => {
            if( error ) return res.status(403).json({ error })
            let tokens = jwtTokenGenerator( user )
            res.cookie( 'refreshToken', tokens.refreshToken, { httpOnly: true })
            res.status(200).json({ msg: 'Token regenerated!', code: 2101 , ...tokens })
        })
    } catch (error) {
        res.status(500).json({error})
        timeLogger({incident: 'Neura returns error'})
    }
})

router.delete('/refreshToken', ( req, res ) => {
    try {
        res.clearCookie( 'refreshToken' )
        return res.status(200).json({ message: 'Refresh Token Cleared!', code: 2102})
    } catch (error) {
        res.status(500).json({error})
        timeLogger({incident: 'Neura returns error'})
    }
})

export default router