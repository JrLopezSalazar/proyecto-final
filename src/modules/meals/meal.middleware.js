import { AppError, catchAsync } from '../../errors/index.js'
import { MealService } from './meal.service.js';

export const validExistMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await MealService.findOneRestaurant(id);

  if (!meal) {
    return next(new AppError('Meal not found', 404));
  }

  req.data = meal.data;
  req.meal = meal;
  next();
});