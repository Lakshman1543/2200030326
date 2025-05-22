import { Router } from 'express';
const router = Router();
import { calculateAverage } from '../controllers/averageController.js';

router.post('/', calculateAverage);

export default router;