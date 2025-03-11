import express from 'express';
import { authenticateToken } from '../middleware/authorization.js';
import { uploadController, uploadPreSignURLController, viewPreSignURLController } from '../controllers/img-conrollers.js';

const router = express.Router()

router.post('/upload', authenticateToken, uploadController)

router.get('/upload/url', authenticateToken, uploadPreSignURLController)

router.get('/view/url', authenticateToken, viewPreSignURLController)

export default router