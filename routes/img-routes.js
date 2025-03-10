import express from 'express';
import { authenticateToken } from '../middleware/authorization.js';
import { uploadController } from '../controllers/img-conrollers.js';

const router = express.Router()

router.post('/upload', authenticateToken, uploadController)

export default router