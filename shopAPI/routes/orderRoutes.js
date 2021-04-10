import express from 'express';

import { protect } from '../middleware/authMiddleware.js';
import {
    addOrder
} from '../controllers/orderControllers.js';

const router = express.Router();

router.route('/').post(protect, addOrder);

export default router;