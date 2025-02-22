import express from 'express'
import { jwtTokenGenerator } from '../utils/jwt-helper.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { psqlFunctionCaller, timeLogger } from 'spooky-node'
import databaseConfig from '../configs/database-config.js'

const router = express.Router()

router.post('/login', async( req, res ) => {
    try {
        timeLogger({incident: 'Login Attempt'})
        console.log('Login attempt with payload: ', req.body)
        const { email, password } = req.body
        const queryResult = await psqlFunctionCaller({
            schemaName: databaseConfig.schemaName,
            sqlFunctionName: databaseConfig.psqlFuntion_login,
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
            return res.status(200).json({msg, code})
        } else {
            res.status(401).json({msg,code})
            timeLogger({incident: 'Login Fail'})
        }
    } catch (error) {
        res.status(500).json({error})
        timeLogger({incident: 'Neura returns error'})
    }
})

export default router