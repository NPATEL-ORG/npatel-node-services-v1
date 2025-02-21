import express from 'express'
import pool from '../db.js'
import bcrypt from 'bcrypt'

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
        console.log('user registration initiated with payload :',req.body)
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await pool.query(
            `SELECT * FROM pichub_dev_v1.insert_user_details($1, $2, $3, $4, $5, $6);`,
            [username, adminList.includes(username) ? 1 : 2, hashedPassword, firstName, lastName, email]
        )
        console.log('Query answered')
        let statusCode = newUser.rows[0]?.code
        if (statusCode === 2000) {
            res.status(201).json({user: newUser.rows})
        } else if ([1001,1002].includes(statusCode)){
            res.status(409).json({error: newUser.rows[0]?.msg})
        } else {
            res.status(406).json({error: newUser.rows[0]?.msg})
        }
    } catch (error) {
        res.status(502).json({error: error.message})
    }
})

export default router