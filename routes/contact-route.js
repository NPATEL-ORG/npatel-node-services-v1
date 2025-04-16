import express from 'express'

const router = express.Router()

router.post('/contact/us', userLoginController )

export default router