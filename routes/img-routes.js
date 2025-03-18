import express from 'express';
import { authenticateToken } from '../middleware/authorization.js';
import { getCommonGallery, uploadController, uploadPreSignURLController, uploadPreSignURLControllerCR2, viewPreSignURLController } from '../controllers/img-conrollers.js';

const router = express.Router()

router.post('/upload', authenticateToken, uploadController)

// router.post('/upload/url', authenticateToken, uploadPreSignURLController)

router.post('/upload/url', authenticateToken, uploadPreSignURLControllerCR2)

router.post('/view/url', viewPreSignURLController)

router.post('/public/gallery', getCommonGallery )

export default router