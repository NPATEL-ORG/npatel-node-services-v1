import express from 'express';
import { authenticateToken } from '../middleware/authorization.js';
import { preSignedURLController, uploadController } from '../controllers/img-conrollers.js';

const router = express.Router()

router.post('/upload', authenticateToken, uploadController)

router.get('/url', authenticateToken, preSignedURLController)

export default router