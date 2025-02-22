import express from 'express'
import bcrypt from 'bcrypt'
import { psqlFunctionCaller, timeLogger } from 'spooky-node'
import databaseConfig from '../configs/database-config.js'

const router = express.Router()
const adminList = ['sajeethan', 'npatel']

router.post('/insert', async(req, res) => {
    const {
        username,
        email,
        firstName,
        lastName,
        password
    } = req.body
    try {
        timeLogger({incident: 'User Registration call'})
        console.log('user registration initiated with payload :',req.body)
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await psqlFunctionCaller({
            poolConfig: databaseConfig.poolConfig,
            params: [username, adminList.includes(username) ? 1 : 2, hashedPassword, firstName, lastName, email],
            schemaName: databaseConfig.schemaName,
            sqlFunctionName: databaseConfig.psqlFunction_signup
        })
        console.log('Query answered', newUser.rows)
        let statusCode = newUser.rows[0]?.code
        if (statusCode === 2000) {
            res.status(201).json({data: newUser.rows[0]})
        } else {
            res.status(409).json({error: newUser.rows[0]?.msg})
        }
        timeLogger({incident: 'Query Answered'})
    } catch (error) {
        res.status(502).json({error: error})
        console.log(error)
        timeLogger({incident: 'Query failed error'})
    }
})

export default router