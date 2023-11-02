import express from 'express';
import { router as userRouter } from '../modules/users/user.routes.js';
import { router as restaurantRouter } from '../modules/restaurants/restaurant.route.js';
import { protect } from '../modules/users/auth.middleware.js';
import {router as mealRouter } from '../modules/meals/meal.routes.js'
import { router as orderRouter } from '../modules/orders/order.routes.js';

export const router = express.Router();

router.use('/users', userRouter);
router.use(protect)
router.use('/restaurants', restaurantRouter);
router.use('/meals', mealRouter)
router.use('/orders', orderRouter)
