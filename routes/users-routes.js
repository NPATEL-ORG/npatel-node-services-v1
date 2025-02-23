import express from 'express'
import { authenticateToken } from '../middleware/authorization.js'
import { getUserListController, signupUserController } from '../controllers/user-controller.js'

const router = express.Router()

router.post('/signup', signupUserController )

router.get('/get/list', authenticateToken, getUserListController )

export default router