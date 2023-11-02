import express from 'express';
import { findAllMeals, findOneMeal, updateMeal, deleteMeal, createMealToRestaurant} from './meal.controller.js'
import { restrictTo} from '../users/auth.middleware.js'
//, createMeal





export const router = express.Router();

router.route('/')
  .get(findAllMeals)
  

router.route('/:id')
    .post(restrictTo('admin'), createMealToRestaurant)
    .get(findOneMeal)
    .patch(restrictTo('admin'), updateMeal)
    .delete(restrictTo('admin'), deleteMeal)
