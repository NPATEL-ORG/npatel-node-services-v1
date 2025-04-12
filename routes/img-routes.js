import express from 'express';
import { authenticateToken } from '../middleware/authorization.js';
import {  getCommonGalleryController, uploadController, uploadPreSignURLController, viewPreSignURLController } from '../controllers/img-conrollers.js';

const router = express.Router()

router.post('/upload', authenticateToken, uploadController)

router.post('/upload/url', authenticateToken, uploadPreSignURLController)

router.post('/view/url', viewPreSignURLController)

router.post('/public/gallery', getCommonGalleryController )

export default router