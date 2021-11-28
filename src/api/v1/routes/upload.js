import { Router } from 'express';
import { uploadController } from '../controllers/upload';
import authMiddleware from '../utilities/authMiddleware';


const router = Router();

router.post('/', authMiddleware, uploadController)

export default router;