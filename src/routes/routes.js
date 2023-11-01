import express from 'express';
import { router as userRouter } from '../modules/users/user.routes.js';
import { router as restaurantRouter } from '../modules/restaurants/restaurant.route.js';
import { protect } from '../modules/users/auth.middleware.js';

export const router = express.Router();

router.use('/users', userRouter);
router.use(protect)
router.use('/restaurants', restaurantRouter);
