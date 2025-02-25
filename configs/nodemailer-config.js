import nodemailer from 'nodemailer'
import dotenv from'dotenv'
dotenv.config()

export const transporter = nodemailer.createTransport({
    host: process.env.NM_MAIL,
    port: process.env.NM_HOST,
    secure: false,
    auth: {
        user: process.env.NM_USERNAME,
        pass: process.env.NM_PASSWORD,
    },
})
