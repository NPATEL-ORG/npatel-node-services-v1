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
        const hashedPassword = await bcrypt.hash(password, 10)
        // console.log('Sending Query ---> ',`SELECT * FROM pichub_dev_v1.insert_user_details(
        //     '${username}',
        //     '${adminList.includes(username)? 1 : 2}',
        //     '${hashedPassword}',
        //     '${firstName}',
        //     '${lastName}',
        //     '${email}'
        //  );`)
        const newUser = await pool.query(`SELECT * FROM insert_user_details(
            ${username},
            ${adminList.includes(username)? 1 : 2},
            ${hashedPassword},
            ${firstName},
            ${lastName},
            ${email}
         );`
        )
        res.send(201).json({user: newUser})
    } catch (error) {
        res.status(502).json({error: error.message})
    }
})

export default router