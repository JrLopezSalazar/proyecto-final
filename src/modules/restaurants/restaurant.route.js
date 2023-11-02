import express from 'express';

import {
  findAllRestaurants,
  createRestaurant,
  findOneRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createReviewToRestaurant,
  updateReview,
  deleteReview,
} from './restaurant.controller.js';
import { validExistRestaurant } from './restaurant.middleware.js';
import { validExistReview } from '../reviews/review.middleware.js';
import { protect, protectAccountOwner, restrictTo } from '../users/auth.middleware.js';

export const router = express.Router();

router.route('/')
  .get(findAllRestaurants)
  .post(restrictTo('admin'), createRestaurant);

router.route('/:id')
  .get(findOneRestaurant)
  .patch(restrictTo('admin'),updateRestaurant)
  .delete(restrictTo('admin'),validExistRestaurant, deleteRestaurant);

router.post('/reviews/:id', validExistRestaurant,createReviewToRestaurant);

router
  .route('/reviews/:restaurantId/:id')
  .patch(protect, validExistRestaurant, 
         validExistReview,
         protectAccountOwner,
         updateReview)

  .delete(validExistRestaurant, 
          validExistReview,
          protectAccountOwner, 
          deleteReview);

router.route('/to'); 
