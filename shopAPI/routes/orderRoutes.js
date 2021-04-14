import express from 'express';

import { protect } from '../middleware/authMiddleware.js';
import {
    addOrder,
    getOrderById
} from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(protect, addOrder);
router.route('/:id').get(protect, getOrderById);

export default router;